import fs from 'fs';
import path from 'path';

// Lighthouse 결과 대시보드 생성
class LighthouseDashboard {
  constructor() {
    this.historyFile = path.join('.lighthouse-history', 'history.json');
  }

  loadHistory() {
    if (!fs.existsSync(this.historyFile)) {
      console.log('❌ No history file found. Run lighthouse tests first.');
      return null;
    }

    try {
      return JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
    } catch (error) {
      console.log('❌ Error loading history:', error.message);
      return null;
    }
  }

  // ASCII 차트 생성
  generateChart(scores, title, maxWidth = 50) {
    if (scores.length === 0) return '';

    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const range = max - min || 1;

    console.log(`\n📊 ${title}`);
    console.log('─'.repeat(maxWidth + 10));

    scores.forEach((score, index) => {
      const barLength = Math.round(((score - min) / range) * maxWidth);
      const bar = '█'.repeat(Math.max(barLength, 1));
      const spaces = ' '.repeat(Math.max(maxWidth - barLength, 0));
      console.log(`${String(index + 1).padStart(2)}: ${bar}${spaces} ${score}`);
    });

    console.log('─'.repeat(maxWidth + 10));
    console.log(`Range: ${min} - ${max}, Latest: ${scores[scores.length - 1]}`);
  }

  // 성능 요약 생성
  generateSummary() {
    const history = this.loadHistory();
    if (!history || history.entries.length === 0) {
      return;
    }

    console.log('🚦 Lighthouse Performance Dashboard');
    console.log('===================================');
    console.log(`📅 Generated: ${new Date().toLocaleString()}`);
    console.log(`📊 Total entries: ${history.entries.length}`);
    
    if (history.entries.length > 0) {
      const latest = history.entries[0];
      console.log(`🕒 Latest: ${new Date(latest.timestamp).toLocaleString()}`);
      console.log(`📝 Latest commit: ${latest.git.commit} - ${latest.git.message}`);
    }

    // URL별 성능 트렌드
    const urlData = this.groupByUrl(history.entries);

    Object.entries(urlData).forEach(([url, data]) => {
      console.log(`\n🌐 ${url}`);
      console.log(`   📈 Entries: ${data.scores.length}`);
      
      const scores = data.scores.map(s => s.performance);
      const avg = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      const latest = scores[scores.length - 1];
      const trend = scores.length > 1 ? this.calculateTrend(scores) : 0;

      console.log(`   📊 Average: ${avg}, Latest: ${latest}`);
      console.log(`   📈 Trend: ${trend > 0 ? '↗️' : trend < 0 ? '↘️' : '➡️'} ${trend >= 0 ? '+' : ''}${trend.toFixed(1)}/run`);

      // 최근 10개 결과로 차트 생성
      const recentScores = scores.slice(-10);
      this.generateChart(recentScores, `Performance Trend (Recent ${recentScores.length} runs)`, 30);

      // 성능 분포
      this.showPerformanceDistribution(scores);
    });

    // 전체 통계
    this.showOverallStats(history.entries);
  }

  // URL별로 데이터 그룹화
  groupByUrl(entries) {
    const urlData = {};

    entries.forEach(entry => {
      Object.entries(entry.results).forEach(([_, result]) => {
        if (!urlData[result.url]) {
          urlData[result.url] = {
            scores: [],
            timestamps: []
          };
        }
        urlData[result.url].scores.push(result.scores);
        urlData[result.url].timestamps.push(entry.timestamp);
      });
    });

    return urlData;
  }

  // 트렌드 계산
  calculateTrend(scores) {
    if (scores.length < 2) return 0;

    const n = scores.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = scores.reduce((sum, score) => sum + score, 0);
    const sumXY = scores.reduce((sum, score, index) => sum + (score * index), 0);
    const sumX2 = scores.reduce((sum, _, index) => sum + (index * index), 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // 성능 분포 표시
  showPerformanceDistribution(scores) {
    const excellent = scores.filter(s => s >= 90).length;
    const good = scores.filter(s => s >= 70 && s < 90).length;
    const needsImprovement = scores.filter(s => s >= 50 && s < 70).length;
    const poor = scores.filter(s => s < 50).length;

    console.log(`\n   📊 Performance Distribution:`);
    console.log(`      🟢 Excellent (90+): ${excellent} (${Math.round(excellent/scores.length*100)}%)`);
    console.log(`      🟡 Good (70-89): ${good} (${Math.round(good/scores.length*100)}%)`);
    console.log(`      🟠 Needs Improvement (50-69): ${needsImprovement} (${Math.round(needsImprovement/scores.length*100)}%)`);
    console.log(`      🔴 Poor (<50): ${poor} (${Math.round(poor/scores.length*100)}%)`);
  }

  // 전체 통계 표시
  showOverallStats(entries) {
    console.log(`\n📈 Overall Statistics`);
    console.log('====================');

    // 트리거별 통계
    const triggerCounts = {};
    entries.forEach(entry => {
      triggerCounts[entry.trigger] = (triggerCounts[entry.trigger] || 0) + 1;
    });

    console.log(`📅 Runs by trigger:`);
    Object.entries(triggerCounts).forEach(([trigger, count]) => {
      console.log(`   ${trigger}: ${count}`);
    });

    // 시간별 분석
    if (entries.length > 1) {
      const firstEntry = entries[entries.length - 1];
      const lastEntry = entries[0];
      const daysDiff = (new Date(lastEntry.timestamp) - new Date(firstEntry.timestamp)) / (1000 * 60 * 60 * 24);
      
      console.log(`⏰ Monitoring period: ${Math.round(daysDiff)} days`);
      console.log(`📊 Average runs per day: ${(entries.length / Math.max(daysDiff, 1)).toFixed(1)}`);
    }

    // 브랜치별 통계
    const branchCounts = {};
    entries.forEach(entry => {
      branchCounts[entry.git.branch] = (branchCounts[entry.git.branch] || 0) + 1;
    });

    if (Object.keys(branchCounts).length > 1) {
      console.log(`🌿 Runs by branch:`);
      Object.entries(branchCounts).forEach(([branch, count]) => {
        console.log(`   ${branch}: ${count}`);
      });
    }
  }

  // JSON 리포트 생성
  generateJsonReport() {
    const history = this.loadHistory();
    if (!history) return;

    const urlData = this.groupByUrl(history.entries);
    const report = {
      generatedAt: new Date().toISOString(),
      totalEntries: history.entries.length,
      urls: {}
    };

    Object.entries(urlData).forEach(([url, data]) => {
      const scores = data.scores.map(s => s.performance);
      const avg = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
      const trend = scores.length > 1 ? this.calculateTrend(scores) : 0;

      report.urls[url] = {
        totalRuns: scores.length,
        averagePerformance: avg,
        latestPerformance: scores[scores.length - 1],
        trend: Number(trend.toFixed(2)),
        recentScores: scores.slice(-10),
        distribution: {
          excellent: scores.filter(s => s >= 90).length,
          good: scores.filter(s => s >= 70 && s < 90).length,
          needsImprovement: scores.filter(s => s >= 50 && s < 70).length,
          poor: scores.filter(s => s < 50).length
        }
      };
    });

    const reportFile = path.join('.lighthouse-history', 'dashboard-report.json');
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    console.log(`\n📄 JSON report saved to: ${reportFile}`);
  }
}

// 스크립트가 직접 실행된 경우
if (import.meta.url === `file://${process.argv[1]}`) {
  const dashboard = new LighthouseDashboard();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'json':
      dashboard.generateJsonReport();
      break;
    case 'summary':
    default:
      dashboard.generateSummary();
      break;
  }
}

export { LighthouseDashboard };