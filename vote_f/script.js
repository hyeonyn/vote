// localStorage에서 투표 결과 불러오기
let votes = JSON.parse(localStorage.getItem('votes')) || { yes: 0, no: 0 };

// 초기 결과 표시
updateResults();

document.getElementById('voteForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const selectedVote = document.querySelector('input[name="vote"]:checked');
  
  if (!selectedVote) {
    alert('찬성 또는 반대를 선택해주세요!');
    return;
  }
  
  // 투표 수 증가
  const vote = selectedVote.value;
  votes[vote]++;
  
  // localStorage에 저장
  localStorage.setItem('votes', JSON.stringify(votes));
  
  // 결과 업데이트
  updateResults();
  
  // 폼 초기화
  selectedVote.checked = false;
});

function updateResults() {
  const totalVotes = votes.yes + votes.no;
  
  // 비율 계산 (총 투표가 0이면 0%로 설정)
  const yesPercentage = totalVotes === 0 ? 0 : Math.round((votes.yes / totalVotes) * 100);
  const noPercentage = totalVotes === 0 ? 0 : Math.round((votes.no / totalVotes) * 100);
  
  // DOM 업데이트
  document.getElementById('yes-percentage').textContent = `${yesPercentage}%`;
  document.getElementById('yes-count').textContent = `${votes.yes}명`;
  document.getElementById('no-percentage').textContent = `${noPercentage}%`;
  document.getElementById('no-count').textContent = `${votes.no}명`;
  
  // 막대 너비 업데이트
  document.querySelector('.yes-bar').style.width = `${yesPercentage}%`;
  document.querySelector('.no-bar').style.width = `${noPercentage}%`;
}