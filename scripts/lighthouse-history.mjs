import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Lighthouse 결과 히스토리를 관리하는 스크립트
class LighthouseHistory {
  constructor() {
    this.historyDir = '.lighthouse-history';
    this.historyFile = path.join(this.historyDir, 'history.json');
    
    // 히스토리 디렉토리 생성
    if (!fs.existsSync(this.historyDir)) {
      fs.mkdirSync(this.historyDir, { recursive: true });
    }
  }

  // Git 정보 가져오기
  getGitInfo() {
    try {
      const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
      const message = execSync('git log -1 --pretty=%s', { encoding: 'utf8' }).trim();
      const author = execSync('git log -1 --pretty=%an', { encoding: 'utf8' }).trim();
      const date = execSync('git log -1 --pretty=%ci', { encoding: 'utf8' }).trim();
      
      return {
        commit: commit.substring(0, 7),
        fullCommit: commit,
        branch,
        message,
        author,
        date
      };
    } catch (error) {
      console.log('⚠️  Could not get git information:', error.message);
      return {
        commit: 'unknown',
        fullCommit: 'unknown',
        branch: 'unknown',
        message: 'unknown',
        author: 'unknown',
        date: new Date().toISOString()
      };
    }
  }

  // 히스토리 파일 로드
  loadHistory() {
    if (!fs.existsSync(this.historyFile)) {
      return {
        entries: [],
        lastUpdated: new Date().toISOString()
      };
    }

    try {
      return JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
    } catch (error) {
      console.log('⚠️  Could not load history file, creating new one');
      return {
        entries: [],
        lastUpdated: new Date().toISOString()
      };
    }
  }

  // 히스토리 파일 저장
  saveHistory(history) {
    history.lastUpdated = new Date().toISOString();
    fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
  }

  // 현재 결과를 히스토리에 추가
  addCurrentResults() {
    const currentResultsDir = '.lighthouse-current';
    
    if (!fs.existsSync(currentResultsDir)) {
      console.log('❌ No current results found to add to history');
      return;
    }

    const gitInfo = this.getGitInfo();
    const history = this.loadHistory();
    
    console.log('📚 Adding results to history...');
    console.log(`📝 Commit: ${gitInfo.commit} - ${gitInfo.message}`);

    // 현재 결과 파일들 읽기
    const summaryFiles = fs.readdirSync(currentResultsDir)
      .filter(file => file.endsWith('-summary.json'));

    if (summaryFiles.length === 0) {
      console.log('❌ No summary files found to add to history');
      return;
    }

    const entry = {
      id: `${Date.now()}-${gitInfo.commit}`,
      timestamp: new Date().toISOString(),
      git: gitInfo,
      trigger: process.env.GITHUB_EVENT_NAME || 'manual',
      results: {}
    };

    // 각 URL별 결과 추가
    summaryFiles.forEach(file => {
      try {
        const summaryData = JSON.parse(
          fs.readFileSync(path.join(currentResultsDir, file), 'utf8')
        );
        
        const urlKey = this.getUrlKey(summaryData.url);
        entry.results[urlKey] = {
          url: summaryData.url,
          scores: summaryData.scores,
          runs: summaryData.runs,
          variance: summaryData.variance || null
        };
      } catch (error) {
        console.log(`⚠️  Could not process ${file}:`, error.message);
      }
    });

    // 히스토리에 추가
    history.entries.unshift(entry); // 최신 항목을 앞에 추가

    // 히스토리 크기 제한 (최대 100개 항목 유지)
    if (history.entries.length > 100) {
      history.entries = history.entries.slice(0, 100);
    }

    this.saveHistory(history);
    
    console.log(`✅ Added entry to history (${history.entries.length} total entries)`);
    
    // 최근 성능 트렌드 분석
    this.analyzeTrend(history, entry);
  }

  // URL을 키로 변환 (해시 생성)
  getUrlKey(url) {
    return Buffer.from(url).toString('base64')
      .replace(/[=/+]/g, '')
      .substring(0, 12);
  }

  // 성능 트렌드 분석
  analyzeTrend(history, currentEntry) {
    console.log('\n📈 Performance Trend Analysis');
    console.log('==============================');

    Object.entries(currentEntry.results).forEach(([urlKey, currentResult]) => {
      console.log(`\n🌐 ${currentResult.url}`);
      
      // 최근 10개 항목에서 같은 URL의 데이터 찾기
      const recentEntries = history.entries
        .slice(0, 11) // 현재 포함해서 11개
        .filter(entry => entry.results[urlKey])
        .slice(0, 10); // 현재 제외하고 최근 10개

      if (recentEntries.length < 2) {
        console.log('ℹ️  Not enough historical data for trend analysis');
        return;
      }

      const performanceHistory = recentEntries
        .map(entry => entry.results[urlKey].scores.performance)
        .reverse(); // 시간순으로 정렬

      const currentPerformance = currentResult.scores.performance;
      const trend = this.calculateTrend(performanceHistory);
      const recentAvg = Math.round(
        performanceHistory.slice(-5).reduce((sum, score) => sum + score, 0) / Math.min(5, performanceHistory.length)
      );

      console.log(`📊 Recent performance (${recentEntries.length} entries): ${performanceHistory.join(' → ')} → ${currentPerformance}`);
      console.log(`📈 Trend: ${trend > 0 ? '↗️ Improving' : trend < 0 ? '↘️ Declining' : '➡️ Stable'} (${trend >= 0 ? '+' : ''}${trend.toFixed(1)}/run)`);
      console.log(`📍 Recent average: ${recentAvg}, Current: ${currentPerformance}`);

      // 경고 및 권장사항
      if (trend < -2) {
        console.log('🔴 WARNING: Consistent performance decline detected!');
      } else if (trend > 2) {
        console.log('🟢 Great! Performance is consistently improving!');
      }

      if (Math.abs(currentPerformance - recentAvg) > 10) {
        console.log(`⚠️  Current score deviates significantly from recent average (${Math.abs(currentPerformance - recentAvg)} points)`);
      }
    });
  }

  // 트렌드 계산 (선형 회귀의 기울기)
  calculateTrend(scores) {
    if (scores.length < 2) return 0;

    const n = scores.length;
    const sumX = (n * (n - 1)) / 2; // 0 + 1 + 2 + ... + (n-1)
    const sumY = scores.reduce((sum, score) => sum + score, 0);
    const sumXY = scores.reduce((sum, score, index) => sum + (score * index), 0);
    const sumX2 = scores.reduce((sum, _, index) => sum + (index * index), 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // 히스토리 요약 생성
  generateSummary() {
    const history = this.loadHistory();
    
    if (history.entries.length === 0) {
      console.log('ℹ️  No historical data available');
      return;
    }

    console.log('\n📚 Lighthouse History Summary');
    console.log('=============================');
    console.log(`📊 Total entries: ${history.entries.length}`);
    console.log(`📅 Date range: ${new Date(history.entries[history.entries.length - 1].timestamp).toDateString()} - ${new Date(history.entries[0].timestamp).toDateString()}`);

    // URL별 통계
    const urlStats = {};
    history.entries.forEach(entry => {
      Object.entries(entry.results).forEach(([urlKey, result]) => {
        if (!urlStats[result.url]) {
          urlStats[result.url] = {
            scores: [],
            count: 0
          };
        }
        urlStats[result.url].scores.push(result.scores.performance);
        urlStats[result.url].count++;
      });
    });

    Object.entries(urlStats).forEach(([url, stats]) => {
      const avg = Math.round(stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length);
      const min = Math.min(...stats.scores);
      const max = Math.max(...stats.scores);
      
      console.log(`\n🌐 ${url}`);
      console.log(`   📊 ${stats.count} entries | Avg: ${avg} | Range: ${min}-${max}`);
    });
  }
}

// 스크립트가 직접 실행된 경우
if (import.meta.url === `file://${process.argv[1]}`) {
  const lighthouseHistory = new LighthouseHistory();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'add':
      lighthouseHistory.addCurrentResults();
      break;
    case 'summary':
      lighthouseHistory.generateSummary();
      break;
    default:
      console.log('📚 Lighthouse History Manager');
      console.log('Usage:');
      console.log('  node lighthouse-history.js add     - Add current results to history');
      console.log('  node lighthouse-history.js summary - Show history summary');
  }
}

export { LighthouseHistory };