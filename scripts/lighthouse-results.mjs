import fs from 'fs';
import path from 'path';

// Lighthouse 결과를 분석하고 평균값을 계산하는 스크립트
function calculateLighthouseAverages() {
  const lighthouseDir = '.lighthouseci';
  const currentResultsDir = '.lighthouse-current';

  // 결과 디렉토리가 없으면 생성
  if (!fs.existsSync(currentResultsDir)) {
    fs.mkdirSync(currentResultsDir, { recursive: true });
  }

  // JSON 파일들 찾기
  const jsonFiles = fs.readdirSync(lighthouseDir)
    .filter(file => file.startsWith('lhr-') && file.endsWith('.json'))
    .map(file => path.join(lighthouseDir, file));

  if (jsonFiles.length === 0) {
    console.log('❌ No Lighthouse report files found');
    return;
  }

  console.log(`✅ Found ${jsonFiles.length} Lighthouse reports`);

  // URL별로 결과를 그룹화
  const groupedResults = {};

  jsonFiles.forEach(file => {
    try {
      const lhr = JSON.parse(fs.readFileSync(file, 'utf8'));
      const url = lhr.finalUrl || lhr.requestedUrl;
      
      if (!groupedResults[url]) {
        groupedResults[url] = [];
      }

      groupedResults[url].push({
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        file: path.basename(file)
      });
    } catch (error) {
      console.log(`❌ Error reading ${file}:`, error.message);
    }
  });

  // URL별로 평균값 계산 및 저장
  Object.entries(groupedResults).forEach(([url, results]) => {
    console.log(`\n🌐 URL: ${url}`);
    console.log(`📊 ${results.length} runs found`);

    if (results.length === 1) {
      // 단일 실행인 경우
      const result = results[0];
      console.log(`🎯 Performance: ${result.performance}`);
      console.log(`♿ Accessibility: ${result.accessibility}`);
      console.log(`⚡ Best Practices: ${result.bestPractices}`);
      console.log(`🔍 SEO: ${result.seo}`);

      // 현재 결과 저장
      const urlHash = Buffer.from(url).toString('base64').replace(/[=/+]/g, '').substring(0, 8);
      const summaryFile = `lighthouse-${urlHash}-summary.json`;
      
      const summaryData = {
        url: url,
        timestamp: new Date().toISOString(),
        runs: 1,
        scores: {
          performance: result.performance,
          accessibility: result.accessibility,
          bestPractices: result.bestPractices,
          seo: result.seo
        },
        rawResults: results
      };

      fs.writeFileSync(
        path.join(currentResultsDir, summaryFile),
        JSON.stringify(summaryData, null, 2)
      );
      
      console.log(`💾 Saved summary to: ${summaryFile}`);
      compareWithPrevious(summaryData, summaryFile);

    } else {
      // 다중 실행인 경우 평균값 계산
      const avgPerformance = Math.round(
        results.reduce((sum, r) => sum + r.performance, 0) / results.length
      );
      const avgAccessibility = Math.round(
        results.reduce((sum, r) => sum + r.accessibility, 0) / results.length
      );
      const avgBestPractices = Math.round(
        results.reduce((sum, r) => sum + r.bestPractices, 0) / results.length
      );
      const avgSeo = Math.round(
        results.reduce((sum, r) => sum + r.seo, 0) / results.length
      );

      console.log(`🎯 Performance: ${avgPerformance} (avg of ${results.map(r => r.performance).join(', ')})`);
      console.log(`♿ Accessibility: ${avgAccessibility} (avg of ${results.map(r => r.accessibility).join(', ')})`);
      console.log(`⚡ Best Practices: ${avgBestPractices} (avg of ${results.map(r => r.bestPractices).join(', ')})`);
      console.log(`🔍 SEO: ${avgSeo} (avg of ${results.map(r => r.seo).join(', ')})`);

      // 표준편차 계산
      const perfStdDev = Math.round(
        Math.sqrt(results.reduce((sum, r) => sum + Math.pow(r.performance - avgPerformance, 2), 0) / results.length)
      );
      
      if (perfStdDev > 5) {
        console.log(`⚠️  High performance variance detected (±${perfStdDev}). Consider more runs for stable results.`);
      }

      // 현재 결과 저장
      const urlHash = Buffer.from(url).toString('base64').replace(/[=/+]/g, '').substring(0, 8);
      const summaryFile = `lighthouse-${urlHash}-summary.json`;
      
      const summaryData = {
        url: url,
        timestamp: new Date().toISOString(),
        runs: results.length,
        scores: {
          performance: avgPerformance,
          accessibility: avgAccessibility,
          bestPractices: avgBestPractices,
          seo: avgSeo
        },
        variance: {
          performance: perfStdDev
        },
        rawResults: results
      };

      fs.writeFileSync(
        path.join(currentResultsDir, summaryFile),
        JSON.stringify(summaryData, null, 2)
      );
      
      console.log(`💾 Saved summary to: ${summaryFile}`);
      compareWithPrevious(summaryData, summaryFile);
    }
  });

  console.log(`\n✅ Analysis complete. Results saved to ${currentResultsDir}/`);
}

// 이전 결과와 비교
function compareWithPrevious(currentData, summaryFile) {
  const previousFile = path.join('.lighthouse-previous', summaryFile);
  
  if (!fs.existsSync(previousFile)) {
    console.log('ℹ️  No previous results to compare with.');
    return;
  }

  try {
    const previousData = JSON.parse(fs.readFileSync(previousFile, 'utf8'));
    
    console.log('');
    console.log('📊 Changes from previous build:');
    
    const performanceDiff = currentData.scores.performance - previousData.scores.performance;
    const accessibilityDiff = currentData.scores.accessibility - previousData.scores.accessibility;
    const bestPracticesDiff = currentData.scores.bestPractices - previousData.scores.bestPractices;
    const seoDiff = currentData.scores.seo - previousData.scores.seo;
    
    const getDiffEmoji = (diff) => diff > 0 ? '📈' : diff < 0 ? '📉' : '➡️';
    const getDiffColor = (diff) => diff >= 10 ? '🟢' : diff <= -10 ? '🔴' : '🟡';
    const formatDiff = (diff) => (diff >= 0 ? '+' : '') + diff;
    
    console.log(`🎯 Performance: ${getDiffEmoji(performanceDiff)} ${formatDiff(performanceDiff)} ${getDiffColor(performanceDiff)}`);
    console.log(`♿ Accessibility: ${getDiffEmoji(accessibilityDiff)} ${formatDiff(accessibilityDiff)} ${getDiffColor(accessibilityDiff)}`);
    console.log(`⚡ Best Practices: ${getDiffEmoji(bestPracticesDiff)} ${formatDiff(bestPracticesDiff)} ${getDiffColor(bestPracticesDiff)}`);
    console.log(`🔍 SEO: ${getDiffEmoji(seoDiff)} ${formatDiff(seoDiff)} ${getDiffColor(seoDiff)}`);
    
    // 심각한 성능 저하 경고
    if (performanceDiff <= -15) {
      console.log('');
      console.log(`⚠️  WARNING: Performance decreased significantly by ${Math.abs(performanceDiff)} points!`);
      console.log(`   Previous: ${previousData.scores.performance}, Current: ${currentData.scores.performance}`);
    } else if (performanceDiff >= 10) {
      console.log('');
      console.log(`🎉 Great! Performance improved by ${performanceDiff} points!`);
    }

    // 전체적인 경향 분석
    const totalChange = performanceDiff + accessibilityDiff + bestPracticesDiff + seoDiff;
    if (totalChange >= 20) {
      console.log('🚀 Overall improvement detected!');
    } else if (totalChange <= -20) {
      console.log('🔴 Overall regression detected. Please review changes.');
    }

  } catch (error) {
    console.log('❌ Error comparing with previous results:', error.message);
  }
}

// 스크립트가 직접 실행된 경우
if (import.meta.url === `file://${process.argv[1]}`) {
  calculateLighthouseAverages();
}

export { calculateLighthouseAverages };