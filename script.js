/* ============ CẤU HÌNH – CHỈ CẦN SỬA PHẦN NÀY ============ */

// 7 đường dẫn ảnh (bỏ ảnh vào thư mục "images" và đặt tên đúng như dưới đây)
// Nếu chưa có ảnh, hoa sẽ hiện trái tim ❤️ thay thế.
var PHOTOS = [
  'images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg',
  'images/5.jpg', 'images/6.jpg', 'images/7.jpg'
];

// Lời chúc trong thiệp
var MSG = "Cảm ơn em đã luôn đã luôn quan tâm, yêu thương anh trong thời gian qua.\n\n" +
          "Lần đầu tiên anh được một người phụ nữ quan tâm đến vậy ngoài gia đình anh, em luôn lo lắng sợ anh buồn, nhắc nhở anh ăn, quan tâm tới sức khoẻ của anh. Em còn rất chiều chuộng anh và còn nhiều thứ anh không kể hết được.\n\n" +
          "Mình yêu nhau và đến với nhau bằng những cách thật lạ kì =))), nhưng anh thật sự rất trân trọng và yêu, thương em nhiều lắm, vợ yêu của anh! ❤️";

/* ============ PHẦN CODE ============ */
var $ = function (id) { return document.getElementById(id); };

// [x%, y%, màu cánh sáng, màu cánh đậm]
var FL = [
  [50, 17, '#ffd1e3', '#ff5c98'],
  [26, 31, '#fff0a8', '#ffb62e'],
  [74, 31, '#ffd1e3', '#f0457f'],
  [14, 51, '#e8d4ff', '#a86bff'],
  [86, 51, '#fff0a8', '#ffb62e'],
  [38, 47, '#ffffff', '#ff9ec0'],
  [62, 47, '#e8d4ff', '#a86bff']
];

var bq = $('bq');
var html = '<svg class="st" viewBox="0 0 100 125">';
FL.forEach(function (f) {
  html += '<path d="M50 112 Q' + ((50 + f[0]) / 2) + ' ' + (f[1] * 1.25 + 40) + ' ' + f[0] + ' ' + (f[1] * 1.25) +
          '" stroke="#2f9e5b" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
});
html += '</svg>';

FL.forEach(function (f, i) {
  var petals = '', k;
  // 10 cánh ngoài
  for (k = 0; k < 10; k++) {
    petals += '<div class="pt" style="--r:' + (k * 36) + 'deg;--p1:' + f[2] + ';--p2:' + f[3] + ';--dd:' + (i * 0.2 + k * 0.05) + 's"></div>';
  }
  // 8 cánh trong (xoay lệch)
  for (k = 0; k < 8; k++) {
    petals += '<div class="pt in" style="--r:' + (k * 45 + 22) + 'deg;--p1:' + f[2] + ';--p2:' + f[3] + ';--dd:' + (i * 0.2 + 0.5 + k * 0.05) + 's"></div>';
  }
  html += '<div class="fl" data-i="' + i + '" style="left:' + f[0] + '%;top:' + f[1] + '%;--d:' + (i * 0.2) + 's">' +
          petals + '<div class="ph" id="ph' + i + '">❤️</div></div>';
});
html += '<div class="wrap"></div><div class="wrap2"></div><div class="bow">🎀</div>' +
        '<button class="card" id="card"><i>💌</i>Bấm vào em nhé</button>';
bq.innerHTML = html;

// Nạp ảnh; ảnh nào lỗi/chưa có thì giữ trái tim
PHOTOS.forEach(function (src, i) {
  if (i >= FL.length) return;
  var img = new Image();
  img.onload = function () {
    var e = $('ph' + i);
    e.textContent = '';
    e.style.backgroundImage = 'url("' + src + '")';
    e.dataset.src = src;
  };
  img.src = src;
});

// Mở quà
$('open').onclick = function () {
  $('s2').classList.add('show');
  $('s2').scrollIntoView();
};
setTimeout(function () { $('s2').classList.add('show'); }, 5000);

// Thiệp: gõ chữ từng ký tự
var timer;
$('card').onclick = function () {
  $('modal').classList.add('on');
  var el = $('msg'), n = 0;
  el.textContent = '';
  clearInterval(timer);
  timer = setInterval(function () {
    el.textContent = MSG.slice(0, ++n);
    if (n >= MSG.length) clearInterval(timer);
  }, 45);
};

// Đóng thiệp -> hoa nở
$('close').onclick = function () {
  clearInterval(timer);
  $('modal').classList.remove('on');
  bq.classList.add('bloom');
  $('card').style.display = 'none';
  $('tip').textContent = '🌸 Hoa đã nở rồi! Bấm vào ảnh để xem lớn nhé.';
  setTimeout(function () {
    document.querySelectorAll('.fl').forEach(function (f) { f.classList.add('sway'); });
  }, 3500);
  for (var i = 0; i < 30; i++) setTimeout(spawn, i * 80);
};

// Xem ảnh lớn
bq.addEventListener('click', function (e) {
  var ph = e.target.closest('.ph');
  if (ph && ph.dataset.src && bq.classList.contains('bloom')) {
    $('lbimg').src = ph.dataset.src;
    $('lightbox').classList.add('on');
  }
});
$('lightbox').onclick = function () { $('lightbox').classList.remove('on'); };

// Tim & hoa rơi
var E = ['💖', '💕', '🌸', '💗', '🌷', '❤️'];
function spawn() {
  var h = document.createElement('div');
  h.className = 'fall';
  h.textContent = E[Math.floor(Math.random() * E.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (14 + Math.random() * 22) + 'px';
  h.style.animationDuration = (5 + Math.random() * 5) + 's';
  document.body.appendChild(h);
  setTimeout(function () { h.remove(); }, 10500);
}
setInterval(spawn, 700);
