// Lấy tất cả các phần tử input và preview
const inputs = {
    name: document.getElementById('name'),
    slogan: document.getElementById('slogan'),
    avatarUrl: document.getElementById('avatarUrl'),
    bankName: document.getElementById('bankName'),
    bankAccount: document.getElementById('bankAccount'),
    walletName: document.getElementById('walletName'),
    walletAccount: document.getElementById('walletAccount'),
    qrCodeUrl: document.getElementById('qrCodeUrl'),
    theme: document.getElementById('themeSelect'),
    musicToggle: document.getElementById('musicToggle'),
    musicSelect: document.getElementById('musicSelect'),
    particleSelect: document.getElementById('particleSelect')
};

const previews = {
    title: document.getElementById('previewTitle'),
    slogan: document.getElementById('previewSlogan'),
    avatar: document.getElementById('previewAvatar'),
    bankName: document.getElementById('previewBankName'),
    bankAccount: document.getElementById('previewBankAccount'),
    walletName: document.getElementById('previewWalletName'),
    walletAccount: document.getElementById('previewWalletAccount'),
    qr: document.getElementById('previewQR')
};

// Toast notification
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('toast-show');
    
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
}

// Cập nhật preview real-time
function updatePreview() {
    // Cập nhật tên
    const name = inputs.name.value || 'BẠN TỐT BỤNG';
    previews.title.textContent = `${name} 🥺`;
    
    // Cập nhật slogan
    previews.slogan.textContent = inputs.slogan.value || '"Sự giàu có của tôi phụ thuộc vào lòng tốt của bạn"';
    
    // Cập nhật avatar
    const avatarUrl = inputs.avatarUrl.value || 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky';
    previews.avatar.src = avatarUrl;
    
    // Cập nhật thông tin ngân hàng
    previews.bankName.textContent = inputs.bankName.value || 'Techcombank';
    previews.bankAccount.textContent = inputs.bankAccount.value || '1900 1234 5678';
    
    // Cập nhật thông tin ví điện tử
    previews.walletName.textContent = inputs.walletName.value || 'Momo';
    previews.walletAccount.textContent = inputs.walletAccount.value || '0909 999 888';
    
    // Cập nhật QR code
    const qrUrl = inputs.qrCodeUrl.value || 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ThankYou';
    previews.qr.src = qrUrl;
}

// Lắng nghe sự kiện input cho tất cả các trường
Object.values(inputs).forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Copy vào clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Copy số tài khoản ngân hàng
document.getElementById('copyBankBtn').addEventListener('click', async () => {
    const bankAccount = inputs.bankAccount.value || '1900 1234 5678';
    const success = await copyToClipboard(bankAccount);
    
    if (success) {
        showToast('Đã copy số tài khoản ngân hàng! 💳');
        document.getElementById('copyBankBtn').classList.add('copy-success');
        setTimeout(() => {
            document.getElementById('copyBankBtn').classList.remove('copy-success');
        }, 300);
    } else {
        showToast('Không thể copy. Vui lòng thử lại! ❌');
    }
});

// Copy số ví điện tử
document.getElementById('copyWalletBtn').addEventListener('click', async () => {
    const walletAccount = inputs.walletAccount.value || '0909 999 888';
    const success = await copyToClipboard(walletAccount);
    
    if (success) {
        showToast('Đã copy số ví điện tử! 💰');
        document.getElementById('copyWalletBtn').classList.add('copy-success');
        setTimeout(() => {
            document.getElementById('copyWalletBtn').classList.remove('copy-success');
        }, 300);
    } else {
        showToast('Không thể copy. Vui lòng thử lại! ❌');
    }
});

// Tạo link chia sẻ
document.getElementById('shareBtn').addEventListener('click', () => {
    // Giá trị mặc định
    const defaults = {
        name: 'BẠN TỐT BỤNG',
        slogan: '"Sự giàu có của tôi phụ thuộc vào lòng tốt của bạn"',
        avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky',
        bankName: 'Techcombank',
        bankAccount: '1900 1234 5678',
        walletName: 'Momo',
        walletAccount: '0909 999 888',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ThankYou',
        theme: 'default',
        particleEffect: 'none',
        musicEnabled: false,
        musicTrack: ''
    };
    
    // Chỉ lưu những giá trị khác mặc định, dùng key ngắn
    const data = {};
    
    if (inputs.name.value !== defaults.name) data.n = inputs.name.value;
    if (inputs.slogan.value !== defaults.slogan) data.s = inputs.slogan.value;
    if (inputs.avatarUrl.value !== defaults.avatarUrl) data.a = inputs.avatarUrl.value;
    if (inputs.bankName.value !== defaults.bankName) data.bn = inputs.bankName.value;
    if (inputs.bankAccount.value !== defaults.bankAccount) data.ba = inputs.bankAccount.value;
    if (inputs.walletName.value !== defaults.walletName) data.wn = inputs.walletName.value;
    if (inputs.walletAccount.value !== defaults.walletAccount) data.wa = inputs.walletAccount.value;
    if (inputs.qrCodeUrl.value !== defaults.qrCodeUrl) data.q = inputs.qrCodeUrl.value;
    if (inputs.theme.value !== defaults.theme) data.t = inputs.theme.value;
    if (inputs.particleSelect.value !== defaults.particleEffect) data.p = inputs.particleSelect.value;
    if (inputs.musicToggle.checked !== defaults.musicEnabled) data.m = inputs.musicToggle.checked ? 1 : 0;
    if (inputs.musicSelect.value !== defaults.musicTrack) data.mt = inputs.musicSelect.value;
    
    // Encode dữ liệu thành base64 tối ưu (không dùng encodeURIComponent)
    // Sử dụng escape/unescape cho Unicode để giảm kích thước
    const jsonStr = JSON.stringify(data);
    const encodedData = btoa(unescape(encodeURIComponent(jsonStr))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    // Tạo URL với query parameter ngắn hơn
    const shareUrl = `${window.location.origin}${window.location.pathname}?d=${encodedData}`;
    
    // Hiển thị link container
    const linkContainer = document.getElementById('shareLinkContainer');
    const linkInput = document.getElementById('shareLinkInput');
    
    linkInput.value = shareUrl;
    linkContainer.classList.remove('hidden');
    
    // Copy URL vào clipboard
    copyToClipboard(shareUrl).then(success => {
        if (success) {
            showToast('Link chia sẻ đã được tạo! 🔗 (Bao gồm theme, hiệu ứng, nhạc)');
        }
    });
    
    // Cuộn xuống đến link container
    setTimeout(() => {
        linkContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
});

// Nút copy link
document.addEventListener('DOMContentLoaded', () => {
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const viewLinkBtn = document.getElementById('viewLinkBtn');
    const shareLinkInput = document.getElementById('shareLinkInput');
    const editBtn = document.getElementById('editBtn');
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
            const link = shareLinkInput.value;
            const success = await copyToClipboard(link);
            
            if (success) {
                showToast('Đã copy link! 📎');
                copyLinkBtn.classList.add('copy-success');
                setTimeout(() => {
                    copyLinkBtn.classList.remove('copy-success');
                }, 300);
            } else {
                showToast('Không thể copy. Vui lòng thử lại! ❌');
            }
        });
    }
    
    if (viewLinkBtn) {
        viewLinkBtn.addEventListener('click', () => {
            const link = shareLinkInput.value;
            window.open(link, '_blank');
            showToast('Mở trang mới! 🚀');
        });
    }
    
    // Nút Edit - Chuyển sang chế độ chỉnh sửa
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            enterEditMode();
        });
    }
});

// Load dữ liệu từ URL khi trang được tải
function loadFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    // Hỗ trợ cả format cũ (data) và format mới (d)
    const encodedData = urlParams.get('d') || urlParams.get('data');
    
    if (encodedData) {
        try {
            // Decode URL-safe base64
            const base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');
            // Thêm padding nếu cần
            const padded = base64 + '===='.slice(0, (4 - base64.length % 4) % 4);
            const jsonStr = decodeURIComponent(escape(atob(padded)));
            const data = JSON.parse(jsonStr);
            
            // Giá trị mặc định
            const defaults = {
                name: 'BẠN TỐT BỤNG',
                slogan: '"Sự giàu có của tôi phụ thuộc vào lòng tốt của bạn"',
                avatarUrl: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky',
                bankName: 'Techcombank',
                bankAccount: '1900 1234 5678',
                walletName: 'Momo',
                walletAccount: '0909 999 888',
                qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ThankYou',
                theme: 'default',
                particleEffect: 'none',
                musicEnabled: false,
                musicTrack: ''
            };
            
            // Giải mã key ngắn (hỗ trợ cả format cũ và mới)
            inputs.name.value = data.n || data.name || defaults.name;
            inputs.slogan.value = data.s || data.slogan || defaults.slogan;
            inputs.avatarUrl.value = data.a || data.avatarUrl || defaults.avatarUrl;
            inputs.bankName.value = data.bn || data.bankName || defaults.bankName;
            inputs.bankAccount.value = data.ba || data.bankAccount || defaults.bankAccount;
            inputs.walletName.value = data.wn || data.walletName || defaults.walletName;
            inputs.walletAccount.value = data.wa || data.walletAccount || defaults.walletAccount;
            inputs.qrCodeUrl.value = data.q || data.qrCodeUrl || defaults.qrCodeUrl;
            
            // Load theme
            const theme = data.t || data.theme || defaults.theme;
            inputs.theme.value = theme;
            changeTheme(theme);
            
            // Load particle effect
            const particleEffect = data.p || data.particleEffect || defaults.particleEffect;
            inputs.particleSelect.value = particleEffect;
            if (particleEffect !== 'none') {
                setTimeout(() => startParticleEffect(particleEffect), 500);
            }
            
            // Load music settings
            const musicEnabled = (data.m !== undefined ? data.m === 1 : (data.musicEnabled !== undefined ? data.musicEnabled : defaults.musicEnabled));
            const musicTrack = data.mt || data.musicTrack || defaults.musicTrack;
            
            inputs.musicToggle.checked = musicEnabled;
            inputs.musicSelect.disabled = !musicEnabled;
            
            if (musicEnabled && musicTrack) {
                inputs.musicSelect.value = musicTrack;
                setTimeout(() => playMusic(musicTrack), 1000);
            }
            
            // Cập nhật preview
            updatePreview();
            
            // Ẩn form bên trái và hiển thị nút Edit
            enterViewMode();
            
            showToast('Đã tải đầy đủ thông tin từ link chia sẻ! ✨🎨🎵');
        } catch (err) {
            console.error('Lỗi khi load dữ liệu từ URL:', err);
        }
    }
}

// Chế độ xem (view mode) - Ẩn form, hiện nút Edit
function enterViewMode() {
    const formPanel = document.querySelector('.w-full.lg\\:w-1\\/3.glass-panel');
    const previewPanel = document.querySelector('.w-full.lg\\:w-2\\/3');
    const editBtn = document.getElementById('editBtn');
    const mobileWarning = document.querySelector('.lg\\:hidden.bg-yellow-100');
    
    if (formPanel) {
        formPanel.classList.add('hidden');
    }
    
    if (previewPanel) {
        previewPanel.classList.remove('lg:w-2/3');
        previewPanel.classList.add('w-full', 'max-w-4xl', 'mx-auto');
    }
    
    if (editBtn) {
        editBtn.classList.remove('hidden');
    }
    
    if (mobileWarning) {
        mobileWarning.classList.add('hidden');
    }
}

// Chế độ chỉnh sửa (edit mode) - Hiện form, ẩn nút Edit
function enterEditMode() {
    const formPanel = document.querySelector('.w-full.lg\\:w-1\\/3.glass-panel');
    const previewPanel = document.querySelector('.w-full.lg\\:w-2\\/3');
    const editBtn = document.getElementById('editBtn');
    const mobileWarning = document.querySelector('.lg\\:hidden.bg-yellow-100');
    
    if (formPanel) {
        formPanel.classList.remove('hidden');
    }
    
    if (previewPanel) {
        previewPanel.classList.add('lg:w-2/3');
        previewPanel.classList.remove('w-full', 'max-w-4xl', 'mx-auto');
    }
    
    if (editBtn) {
        editBtn.classList.add('hidden');
    }
    
    if (mobileWarning) {
        mobileWarning.classList.remove('hidden');
    }
    
    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('Đã chuyển sang chế độ chỉnh sửa! ✏️');
}

// Error handling cho ảnh
previews.avatar.addEventListener('error', function() {
    this.src = 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky';
});

previews.qr.addEventListener('error', function() {
    this.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ThankYou';
});

// Smooth scroll cho mobile
if (window.innerWidth < 1024) {
    const inputs_array = Object.values(inputs);
    inputs_array.forEach(input => {
        input.addEventListener('focus', () => {
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}

// Thêm animation khi hover vào các card
document.querySelectorAll('.hover\\:-translate-y-1').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animation cho progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.h-3 > div');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.width;
        }, index * 100);
    });
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    loadFromURL();
    updatePreview();
    animateProgressBars();
    
    // Thêm animation fade-in
    setTimeout(() => {
        document.querySelector('.animate-fade-in-up').style.opacity = '1';
    }, 100);
});

// Service Worker để cache trang (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Có thể thêm service worker sau nếu muốn
        console.log('App ready! 🚀');
    });
}

// Xử lý responsive
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-calculate layouts nếu cần
        updatePreview();
    }, 250);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showToast('Bạn đã mở khóa chế độ siêu nhân! 🦸‍♂️');
        document.body.style.animation = 'rainbow 2s infinite';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S để download HTML
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showToast('Sử dụng nút "Tạo Link Chia Sẻ" để lưu! 💾');
    }
});

// Auto-save vào localStorage (optional)
let autoSaveTimer;
Object.values(inputs).forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            const data = {
                name: inputs.name.value,
                slogan: inputs.slogan.value,
                avatarUrl: inputs.avatarUrl.value,
                bankName: inputs.bankName.value,
                bankAccount: inputs.bankAccount.value,
                walletName: inputs.walletName.value,
                walletAccount: inputs.walletAccount.value,
                qrCodeUrl: inputs.qrCodeUrl.value,
                theme: inputs.theme.value,
                particleEffect: inputs.particleSelect.value,
                musicEnabled: inputs.musicToggle.checked,
                musicTrack: inputs.musicSelect.value
            };
            localStorage.setItem('nuoi-toi-data', JSON.stringify(data));
        }, 1000);
    });
});

// Load từ localStorage nếu không có dữ liệu từ URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get('data')) {
        const savedData = localStorage.getItem('nuoi-toi-data');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.name) inputs.name.value = data.name;
                if (data.slogan) inputs.slogan.value = data.slogan;
                if (data.avatarUrl) inputs.avatarUrl.value = data.avatarUrl;
                if (data.bankName) inputs.bankName.value = data.bankName;
                if (data.bankAccount) inputs.bankAccount.value = data.bankAccount;
                if (data.walletName) inputs.walletName.value = data.walletName;
                if (data.walletAccount) inputs.walletAccount.value = data.walletAccount;
                if (data.qrCodeUrl) inputs.qrCodeUrl.value = data.qrCodeUrl;
                if (data.theme) {
                    inputs.theme.value = data.theme;
                    changeTheme(data.theme);
                }
                if (data.particleEffect) {
                    inputs.particleSelect.value = data.particleEffect;
                }
                if (data.musicEnabled) inputs.musicToggle.checked = data.musicEnabled;
                if (data.musicTrack) inputs.musicSelect.value = data.musicTrack;
                updatePreview();
            } catch (err) {
                console.error('Lỗi khi load dữ liệu từ localStorage:', err);
            }
        }
    }
});

// ==================== THEME SYSTEM ====================

// Đổi theme màu sắc
function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.body.classList.add('theme-transition');
    
    // Lưu vào localStorage
    const savedData = JSON.parse(localStorage.getItem('nuoi-toi-data') || '{}');
    savedData.theme = theme;
    localStorage.setItem('nuoi-toi-data', JSON.stringify(savedData));
    
    // Hiệu ứng chuyển đổi
    showToast(`Đã chuyển sang chế độ ${getThemeName(theme)}! 🎨`);
}

function getThemeName(theme) {
    const themes = {
        'default': 'Mặc Định',
        'ocean': 'Đại Dương',
        'sunset': 'Hoàng Hôn',
        'forest': 'Rừng Xanh',
        'candy': 'Kẹo Ngọt',
        'dark': 'Tối',
        'gradient': 'Cầu Vồng'
    };
    return themes[theme] || 'Mặc Định';
}

// Lắng nghe sự kiện thay đổi theme
inputs.theme.addEventListener('change', (e) => {
    changeTheme(e.target.value);
});

// ==================== MUSIC SYSTEM ====================

let audioPlayer = null;
let musicIndicator = null;

// Danh sách nhạc Việt yêu thích
// Dropbox raw link format: thay /scl/ thành /s/ và bỏ ?rlkey
const musicTracks = {
    // Nhạc Việt Yêu Thích (Dropbox - Raw Link)
    'custom1': { 
        name: '🎵 Sếp Mai Number One (Mai Lisa)', 
        url: 'https://dl.dropboxusercontent.com/scl/fi/7wa0dcog4hqrr1hnkrb6e/B-i-h-t-S-p-Mai-Number-One-TMV-Malisa-GIA-NH-DRAMA.mp3?rlkey=fihr81mr42nzcpf1obxf7tpwn&st=khzv98c9'
    },
    'custom2': { 
        name: '🎵 Đen - Nấu ăn cho em ft. PiaLinh', 
        url: 'https://dl.dropboxusercontent.com/scl/fi/ixh6k1fvkmk51p7i56gsy/en-N-u-n-cho-em-ft.-PiaLinh-M_V-en-V-u-Official.mp3?rlkey=t1ip1e8xhyo5carh3pgp0abcs&st=q3ab61co'
    },
    'custom3': { 
        name: '🎵 Tôi nuôi cả - Châu Tinh Tấm', 
        url: 'https://dl.dropboxusercontent.com/scl/fi/38pzg2plk6aepim3jn2iv/T-i-nu-i-c-.-Ch-u-Tinh-T-Diem-Nhu-Dang.mp3?rlkey=cpd5c4ixqlmpa7bc1cr5is5kn&st=8u02k5wa'
    }
};

// Tạo music indicator
function createMusicIndicator() {
    if (musicIndicator) return;
    
    musicIndicator = document.createElement('div');
    musicIndicator.className = 'music-indicator';
    musicIndicator.innerHTML = `
        <div class="music-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <span id="currentTrackName" class="max-w-[200px] truncate">Đang tải...</span>
        <button id="stopMusicBtn" class="ml-2 hover:text-red-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 12H8"></path>
            </svg>
        </button>
    `;
    document.body.appendChild(musicIndicator);
    
    // Nút tắt nhạc
    document.getElementById('stopMusicBtn').addEventListener('click', () => {
        inputs.musicToggle.checked = false;
        stopMusic();
    });
}

// Phát nhạc
function playMusic(trackId) {
    if (!trackId || !musicTracks[trackId]) return;
    
    try {
        const track = musicTracks[trackId];
        
        // Kiểm tra xem có URL hợp lệ không
        if (!track.url || track.url === '') {
            // Nếu không có URL, hiển thị hướng dẫn
            showToast('⚠️ Vui lòng upload nhạc lên Catbox.moe và cập nhật link!');
            
            // Hiển thị hướng dẫn chi tiết
            const instruction = `
📌 HƯỚNG DẪN UPLOAD NHẠC:

1. Truy cập: https://catbox.moe
2. Click "Choose File" và chọn file nhạc của bạn
3. Click "Upload" và đợi
4. Copy link ở mục "Direct link to file"
5. Dán vào script.js, dòng:
   'custom${trackId === 'custom1' ? '1' : '2'}': { 
       name: '${track.name}',
       url: 'DÁN_LINK_VÀO_ĐÂY' 
   }

Hoặc dùng:
- Dropbox Public Link
- Firebase Storage
- GitHub Raw Link
            `;
            
            console.log(instruction);
            alert(instruction);
            
            inputs.musicToggle.checked = false;
            return;
        }
        
        // Tạo indicator
        createMusicIndicator();
        
        // Dừng nhạc cũ nếu có
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            audioPlayer = null;
        }
        
        // Tạo audio player mới
        audioPlayer = new Audio(track.url);
        audioPlayer.loop = true;
        audioPlayer.volume = 0.3; // 30% volume
        audioPlayer.crossOrigin = "anonymous"; // CORS support
        
        // Show loading
        musicIndicator.classList.add('active');
        document.getElementById('currentTrackName').textContent = 'Đang tải...';
        
        // Event listeners
        audioPlayer.addEventListener('loadstart', () => {
            console.log('Bắt đầu tải nhạc:', track.name);
        });
        
        audioPlayer.addEventListener('canplay', () => {
            console.log('Sẵn sàng phát nhạc');
        });
        
        audioPlayer.addEventListener('playing', () => {
            document.getElementById('currentTrackName').textContent = track.name;
            showToast(`🎵 Đang phát: ${track.name}`);
        });
        
        audioPlayer.addEventListener('error', (e) => {
            console.error('Lỗi phát nhạc:', e);
            console.error('URL gây lỗi:', track.url);
            showToast('❌ Lỗi phát nhạc! Vui lòng kiểm tra link hoặc upload lại!');
            stopMusic();
        });
        
        audioPlayer.addEventListener('ended', () => {
            // Loop lại nếu cần
            if (audioPlayer.loop) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
            }
        });
        
        // Phát nhạc
        audioPlayer.play().catch(err => {
            console.error('Lỗi khi phát nhạc:', err);
            showToast('⚠️ Không thể phát nhạc. Vui lòng upload lên Catbox.moe!');
        });
        
        // Lưu vào localStorage
        const savedData = JSON.parse(localStorage.getItem('nuoi-toi-data') || '{}');
        savedData.musicEnabled = true;
        savedData.musicTrack = trackId;
        localStorage.setItem('nuoi-toi-data', JSON.stringify(savedData));
        
    } catch (err) {
        console.error('Lỗi khi phát nhạc:', err);
        showToast('❌ Không thể phát nhạc. Vui lòng thử lại!');
    }
}

// Dừng nhạc
function stopMusic() {
    if (audioPlayer) {
        try {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            audioPlayer = null;
        } catch (err) {
            console.error('Lỗi khi dừng nhạc:', err);
        }
    }
    
    if (musicIndicator) {
        musicIndicator.classList.remove('active');
    }
    
    showToast('Đã tắt nhạc nền 🔇');
    
    // Lưu vào localStorage
    const savedData = JSON.parse(localStorage.getItem('nuoi-toi-data') || '{}');
    savedData.musicEnabled = false;
    localStorage.setItem('nuoi-toi-data', JSON.stringify(savedData));
}

// Toggle nhạc
inputs.musicToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        inputs.musicSelect.disabled = false;
        if (inputs.musicSelect.value) {
            playMusic(inputs.musicSelect.value);
        } else {
            showToast('Vui lòng chọn bài nhạc yêu thích! 🎵');
        }
    } else {
        inputs.musicSelect.disabled = true;
        stopMusic();
    }
});

// Chọn bài nhạc
inputs.musicSelect.addEventListener('change', (e) => {
    if (inputs.musicToggle.checked && e.target.value) {
        playMusic(e.target.value);
    }
});

// ==================== PARTICLE EFFECTS SYSTEM ====================

let particleInterval = null;
let particles = [];

// Tạo particle
function createParticle(type) {
    const particle = document.createElement('div');
    particle.className = `particle ${type}`;
    
    // Random vị trí ngang
    const left = Math.random() * 100;
    particle.style.left = left + '%';
    particle.style.top = '-20px'; // Bắt đầu từ trên cùng
    
    // Random animation duration (tốc độ rơi)
    const duration = 8 + Math.random() * 7; // 8-15 seconds
    particle.style.animationDuration = duration + 's';
    
    switch(type) {
        case 'snow':
            // Chọn biểu tượng tuyết ngẫu nhiên
            particle.textContent = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
            // Kích thước ngẫu nhiên
            particle.style.fontSize = (18 + Math.random() * 20) + 'px';
            // Độ mờ ngẫu nhiên
            particle.style.opacity = (0.6 + Math.random() * 0.4).toString();
            break;
        
        default:
            // Fallback mặc định là tuyết rơi
            particle.textContent = '❄';
            particle.style.fontSize = '24px';
            particle.style.opacity = '0.8';
            break;
    }
    
    document.body.appendChild(particle);
    particles.push(particle);
    
    // Xóa particle sau khi animation kết thúc
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
        particles = particles.filter(p => p !== particle);
    }, duration * 1000 + 500); // Thêm 500ms để đảm bảo animation kết thúc
}

// Bắt đầu particle effect
function startParticleEffect(type) {
    stopParticleEffect();
    
    if (type === 'none') return;
    
    // Tạo particles liên tục
    const createRate = 200; // Tạo một bông tuyết mỗi 200ms (nhanh hơn)
    particleInterval = setInterval(() => {
        createParticle(type);
    }, createRate);
    
    // Tạo nhiều particles ngay lập tức để hiệu ứng đầy hơn
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(type), i * 80);
    }
    
    showToast(`🎨 Đã bật hiệu ứng ${getParticleName(type)}!`);
    
    // Lưu vào localStorage
    const savedData = JSON.parse(localStorage.getItem('nuoi-toi-data') || '{}');
    savedData.particleEffect = type;
    localStorage.setItem('nuoi-toi-data', JSON.stringify(savedData));
}

// Dừng particle effect
function stopParticleEffect() {
    if (particleInterval) {
        clearInterval(particleInterval);
        particleInterval = null;
    }
    
    // Xóa tất cả particles hiện có
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.remove();
        }
    });
    particles = [];
}

// Lấy tên hiệu ứng
function getParticleName(type) {
    const names = {
        'snow': 'Tuyết rơi ❄️'
    };
    return names[type] || 'Không có';
}

// Lắng nghe sự kiện thay đổi particle effect
inputs.particleSelect.addEventListener('change', (e) => {
    const effect = e.target.value;
    if (effect === 'none') {
        stopParticleEffect();
        showToast('🚫 Đã tắt hiệu ứng đặc biệt');
    } else {
        startParticleEffect(effect);
    }
});

// Load particle effect từ localStorage
window.addEventListener('load', () => {
    setTimeout(() => {
        const savedData = localStorage.getItem('nuoi-toi-data');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                if (data.particleEffect && data.particleEffect !== 'none') {
                    inputs.particleSelect.value = data.particleEffect;
                    startParticleEffect(data.particleEffect);
                }
            } catch (err) {
                console.error('Lỗi khi load particle effect:', err);
            }
        }
    }, 500);
});
