#!/bin/bash

echo "🧪 Running E2E tests..."

# E2E 테스트 실행 (순차 실행, JSON 출력을 temp 파일로 저장)
npx playwright test --project=dev-sequential --reporter=list --reporter=json > /tmp/e2e-results.json

# JSON 결과에서 성공/실패 통계 추출
if [ -f "/tmp/e2e-results.json" ]; then
  # stats 섹션에서 테스트 결과 추출
  expected=$(cat /tmp/e2e-results.json | jq -r '.stats.expected // 0' 2>/dev/null)
  unexpected=$(cat /tmp/e2e-results.json | jq -r '.stats.unexpected // 0' 2>/dev/null)
  skipped=$(cat /tmp/e2e-results.json | jq -r '.stats.skipped // 0' 2>/dev/null)
  
  # jq가 없는 경우 grep 사용
  if [ "$expected" = "null" ] || [ -z "$expected" ]; then
    expected=$(cat /tmp/e2e-results.json | grep -o '"expected":[0-9]*' | grep -o '[0-9]*' | head -1)
    unexpected=$(cat /tmp/e2e-results.json | grep -o '"unexpected":[0-9]*' | grep -o '[0-9]*' | head -1)
    skipped=$(cat /tmp/e2e-results.json | grep -o '"skipped":[0-9]*' | grep -o '[0-9]*' | head -1)
  fi
  
  # 값이 비어있으면 0으로 설정
  expected=${expected:-0}
  unexpected=${unexpected:-0}
  skipped=${skipped:-0}
  
  # 총 테스트 수 계산
  total=$((expected + unexpected + skipped))
  passed=$expected
  failed=$unexpected
  
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
      rm -f /tmp/e2e-results.json
      exit 0
    else
      echo "❌ E2E tests failed with $success_rate% success rate (<80%). Push blocked!"
      echo "Please fix failing tests before pushing."
      rm -f /tmp/e2e-results.json
      exit 1
    fi
  else
    echo "⚠️  No E2E test results found. Push blocked!"
    rm -f /tmp/e2e-results.json
    exit 1
  fi
else
  echo "❌ Failed to run E2E tests. Push blocked!"
  exit 1
fi