# Lighthouse CI Scripts

이 디렉토리는 Lighthouse CI의 성능 측정 결과를 분석하고 관리하는 스크립트들을 포함합니다.

## 🚦 스크립트 개요

### 1. `lighthouse-results.js`

- Lighthouse CI 결과를 분석하고 평균값을 계산
- 여러 번 실행된 결과의 평균값 자동 계산
- 이전 결과와의 비교 분석
- JSON 형태로 요약 데이터 저장

### 2. `lighthouse-history.js`

- Lighthouse 결과의 히스토리 관리
- Git 커밋 정보와 함께 성능 데이터 저장
- 성능 트렌드 분석 (선형 회귀 기반)
- 장기적인 성능 변화 추적

### 3. `lighthouse-dashboard.js`

- 성능 데이터 시각화 및 요약
- ASCII 차트로 트렌드 표시
- 성능 분포 및 전체 통계 제공
- JSON 리포트 생성

## 📊 사용 방법

### npm 스크립트 사용 (권장)

```bash
# Lighthouse 결과 분석
npm run lighthouse:analyze

# 히스토리에 결과 추가
npm run lighthouse:history add

# 히스토리 요약 보기
npm run lighthouse:history summary

# 대시보드 보기
npm run lighthouse:dashboard

# JSON 리포트 생성
npm run lighthouse:report
```

### 직접 실행

```bash
# 결과 분석
node scripts/lighthouse-results.mjs

# 히스토리 관리
node scripts/lighthouse-history.mjs add
node scripts/lighthouse-history.mjs summary

# 대시보드
node scripts/lighthouse-dashboard.mjs
node scripts/lighthouse-dashboard.mjs json
```

## 🔄 GitHub Actions 워크플로우

GitHub Actions에서 자동으로 실행되는 과정:

1. **라이트하우스 실행**: `numberOfRuns: 3`으로 설정되어 3번 실행
2. **결과 분석**: `lighthouse-results.js`로 평균값 계산 및 이전 결과와 비교
3. **히스토리 저장**: `lighthouse-history.js`로 결과를 히스토리에 추가
4. **트렌드 분석**: 최근 결과들의 성능 트렌드 분석
5. **캐시 저장**: 다음 실행을 위해 결과 캐시

### 스케줄링

- **매일 2회 실행**: 오전 9시 (UTC 0시), 오후 6시 (UTC 9시)
- **수동 실행 가능**: GitHub Actions의 "Run workflow" 버튼
- **Push/PR 시**: main, develop 브랜치 변경 시 자동 실행

## 📁 파일 구조

```
.lighthouse-current/     # 현재 실행 결과 (임시)
.lighthouse-previous/    # 이전 결과 (비교용)
.lighthouse-history/     # 장기 히스토리 데이터
  ├── history.json      # 전체 히스토리 데이터
  └── dashboard-report.json  # 대시보드 리포트
.lighthouseci/          # Lighthouse CI 원본 결과
```

## 📈 성능 메트릭

각 URL에 대해 다음 메트릭을 추적합니다:

- **Performance**: 성능 점수 (0-100)
- **Accessibility**: 접근성 점수 (0-100)
- **Best Practices**: 모범 사례 점수 (0-100)
- **SEO**: SEO 점수 (0-100)

### 성능 분류

- 🟢 **Excellent** (90+): 매우 좋음
- 🟡 **Good** (70-89): 좋음
- 🟠 **Needs Improvement** (50-69): 개선 필요
- 🔴 **Poor** (<50): 나쁨

## ⚠️ 알림 및 경고

### 성능 저하 경고

- **-15점 이상 감소**: 심각한 성능 저하 경고
- **±10점 이상 변화**: 유의미한 변화로 간주
- **높은 분산**: 실행 간 점수 차이가 클 때 추가 실행 권장

### 트렌드 분석

- **↗️ 상승 트렌드**: 지속적인 성능 개선
- **↘️ 하락 트렌드**: 지속적인 성능 저하
- **➡️ 안정 트렌드**: 성능 유지

## 🛠 설정

### Lighthouse CI 설정 (`lighthouserc.js`)

```javascript
numberOfRuns: 3,  // 3번 실행해서 평균값 계산
throttling: {
  cpuSlowdownMultiplier: 2,
  // ...
}
```

### GitHub Actions 캐시

- **lighthouse-db**: Lighthouse CI 데이터베이스
- **lighthouse-results**: 이전 결과 캐시
- **lighthouse-history**: 히스토리 데이터 캐시

## 📊 데이터 보존

- **히스토리**: 최대 100개 항목 유지
- **아티팩트**: 7일간 보관
- **리포트**: 30일간 보관
