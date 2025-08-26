#!/bin/bash

echo "🧪 Running E2E tests..."

# E2E 테스트 실행 (순차 실행, 진행률과 JSON 출력 동시 저장)
npx playwright test --project=dev-sequential --reporter=list --reporter=json:e2e-results.json

# JSON 결과에서 성공/실패 통계 추출
if [ -f "e2e-results.json" ]; then
  # jq를 사용하여 JSON 파싱
  total=$(cat e2e-results.json | grep -o '"status"' | wc -l | tr -d ' ')
  passed=$(cat e2e-results.json | grep -o '"status":"passed"' | wc -l | tr -d ' ')
  failed=$(cat e2e-results.json | grep -o '"status":"failed"' | wc -l | tr -d ' ')
  
  # 성공률 계산 (bash에서는 정수 연산만 가능하므로 100을 곱해서 계산)
  if [ "$total" -gt 0 ]; then
    success_rate=$((passed * 100 / total))
    echo "📊 E2E Test Results:"
    echo "  Total tests: $total"
    echo "  Passed: $passed"
    echo "  Failed: $failed"
    echo "  Success rate: $success_rate%"
    
    # 80% 이상인지 확인
    if [ "$success_rate" -ge 80 ]; then
      echo "✅ E2E tests passed with $success_rate% success rate (≥80%). Push allowed!"
      rm -f e2e-results.json
      exit 0
    else
      echo "❌ E2E tests failed with $success_rate% success rate (<80%). Push blocked!"
      echo "Please fix failing tests before pushing."
      rm -f e2e-results.json
      exit 1
    fi
  else
    echo "⚠️  No E2E test results found. Push blocked!"
    rm -f e2e-results.json
    exit 1
  fi
else
  echo "❌ Failed to run E2E tests. Push blocked!"
  exit 1
fi