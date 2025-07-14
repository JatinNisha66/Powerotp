
let otpData = [];

fetch('/api/otp')
  .then(res => res.json())
  .then(data => {
    otpData = data;
    renderList(data);
  });

function renderList(data) {
  const otpList = document.getElementById('otpList');
  otpList.innerHTML = '';
  data.forEach(entry => {
    const box = document.createElement('div');
    box.className = 'otp-box';
    box.innerHTML = `
      <div>
        <strong>${entry.number}</strong><br>
        OTP: <span>${entry.otp}</span>
      </div>
      <button class="copy-btn" onclick="copyOTP('${entry.otp}')">Copy</button>
    `;
    otpList.appendChild(box);
  });
}

function copyOTP(otp) {
  navigator.clipboard.writeText(otp).then(() => {
    alert("OTP Copied: " + otp);
  });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const search = e.target.value;
  const filtered = otpData.filter(item => item.number.includes(search));
  renderList(filtered);
});
