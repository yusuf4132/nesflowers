import React from 'react'

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function Communucation() {
  const phoneNumber = '905457353564'; // WhatsApp numaran
  const instagramUsername = 'nes.flowerss';
  const tiktokUsername = 'nesf_flowers';
  const email = 'sonmezeraleyna0@gmail.com';
  const handleWhatsAppClick = () => {
    const message = 'Merhaba!';
    const url = isMobile()
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleInstagramClick = () => {
    const url = isMobile()
      ? `instagram://user?username=${instagramUsername}`
      : `https://www.instagram.com/${instagramUsername}`;
    window.open(url, '_blank');
  };

  const handleTikTokClick = () => {
    const url = isMobile()
      ? `tiktok://user?username=${tiktokUsername}`
      : `https://www.tiktok.com/@${tiktokUsername}`;
    window.open(url, '_blank');
  };
  const handleMailClick = () => {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(url, '_blank');
  };
  return (
    <>
      <div className='comm'>
        <div class="container">
          <div class="icon whatsapp" onClick={handleWhatsAppClick}>
            <div class="tooltip">WhatsApp</div>
            <span>
              <i class="fa-brands fa-whatsapp"></i>
            </span>
          </div>

          <div class="icon instagram" onClick={handleInstagramClick}>
            <div class="tooltip">İnstagram</div>
            <span>
              <i class="fa-brands fa-instagram"></i>
            </span>
          </div>

          <div class="icon mail" onClick={handleMailClick}>
            <div class="tooltip">Mail</div>
            <span>
              <i class="fa-solid fa-envelope"></i>
            </span>
          </div>

          <div class="icon tiktok" onClick={handleTikTokClick}>
            <div class="tooltip">Tiktok</div>
            <span>
              <i class="fa-brands fa-tiktok"></i>
            </span>
          </div>

        </div>
        <div className="info-container">
          <p><i class="fa-brands fa-whatsapp"></i> WhatsApp:  0545 735 35 64</p>
          <p><i class="fa-brands fa-instagram"></i> Instagram: @{instagramUsername}</p>
          <p><i class="fa-brands fa-tiktok"></i> TikTok : @{tiktokUsername}</p>
          <p><i class="fa-solid fa-envelope"></i> Mail : {email}</p>
        </div>
      </div>
    </>
  )
}

export default Communucation