/**
 * 1.Render songs
 * 2.Scroll top
 * 3.Play / pause / seek
 * 4.CD rotate (xoay)
 * 5.Next / prev
 * 6.Random
 * 7.Next / Repeat when ended
 * 8.Active song
 * 9.Scroll active song into view
 * 10.Play song when click
 */


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STROAGE_KEY = 'F8_PLAYER'

const player = $('.container')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const playlist = $('.playlist')
const song = $('.song')



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STROAGE_KEY)) || {},
    songs: [
        {
            name: "Counting Stars",
            singer: "OneRepublic",
            path: "https://tainhac365.org/download-music/4037",
            image: "https://avatar-nct.nixcdn.com/song/2017/11/13/3/e/1/2/1510567502143_640.jpg"
        },
        {
            name: "Close",
            singer: "The Chainsmokers & Halsey",
            path: "https://tainhac365.org/download-music/1108",
            image: "https://m.media-amazon.com/images/I/71W41ZB39lL._SS500_.jpg"
        },
        {
            name: "Attention",
            singer: "Charlie Puth",
            path: "https://tainhac365.org/download-music/501796",
            image: "https://i.ytimg.com/vi/rolCnUu8m-I/hqdefault.jpg"
        },
        {
            name: "Comethru",
            singer: "Jeremy Zucker",
            path: "https://tainhac365.org/download-music/40073",
            image: "https://i.ytimg.com/vi/sEbFxmLhekU/hqdefault.jpg"
        },
        {
            name: "Demons",
            singer: "Imagine Dragons",
            path: "https://tainhac365.org/download-music/2164",
            image: "https://bandlabimages.azureedge.net/v1.0/songs/55a983bd-882e-4fa0-86c3-6a4d034f88e9/640x640"
        },
        {
            name: "Head In The Clouds",
            singer: "Hayd",
            path: "https://tainhac365.org/download-music/552497",
            image: "https://i.scdn.co/image/ab67616d0000b2734c63cfdb09841a113ea7da1b"
        },
        {
            name: "Hero Feat Christina Perri",
            singer: "Cash Cash",
            path: "https://tainhac365.org/download-music/501909",
            image: "https://i.ytimg.com/vi/GKszRl2tLkk/maxresdefault.jpg"
        },
        {
            name: "Shape Of You",
            singer: "Ed Sheeran",
            path: "https://tainhac365.org/download-music/501591",
            image: "https://upload.wikimedia.org/wikipedia/vi/thumb/a/a3/Shape_of_You_cover.jpg/220px-Shape_of_You_cover.jpg"
        },
        {
            name: "Something Just Like This",
            singer: "The Chainsmok",
            path: "https://tainhac365.org/download-music/203",
            image: "https://upload.wikimedia.org/wikipedia/vi/thumb/5/57/Something_Just_Like_This.png/220px-Something_Just_Like_This.png"
        },
        {
            name: "Stay",
            singer: "The Kid LAROI & JustinBieber",
            path: "https://tainhac365.org/download-music/491100",
            image: "https://upload.wikimedia.org/wikipedia/vi/thumb/1/1e/Poster_b%C3%A0i_h%C3%A1t_%22Stay%22.png/220px-Poster_b%C3%A0i_h%C3%A1t_%22Stay%22.png"
        },
        {
            name: "Novada",
            singer: "Monstercat",
            path: "https://tainhac365.org/download-music/1365",
            image: "https://avatar-nct.nixcdn.com/singer/avatar/2016/07/20/a/8/c/e/1468981718704_600.jpg"
        },


    ],
    // lưu khi thoat ra
    setConfig: function (key, value) {
        // set vào object 
        this.config[key] = value;
        // lưu và localStorage
        localStorage.setItem(PLAYER_STROAGE_KEY, JSON.stringify(this.config))
    },

    // Hàm view
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                style=" background-image: url('${song.image}'); " ></div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
          </div>
        `
            // ${index === this.currentIndex ? 'active' : ''} 
        })
        playlist.innerHTML = htmls.join('')
    },
    // Định nghĩa ra thuộc tính cho apps
    defineProperties: function () {
        // defineProperty() >> cho phép khai báo thuộc tính mới, hoặc thay đổi một thuộc tính đã có của một object >> sử dụng property descriptors.chỉ cho phép thay đổi một thuộc tính duy nhất
        // Có 3 đối số : 1.Đối tượng sẽ tạo hoặc cấu hình các thuộc tính,2.tên thuộc tính được định nghĩa là một chuỗi, 3.Một đối tượng với định nghĩa thuộc tính.
        Object.defineProperty(this, 'currentSongs', {
            get() {
                return this.songs[this.currentIndex]
            }
        })
    },

    // hàm sử lý sự kiện
    handleEvents: function () {
        const _this = this
        // Lấy ra width của block  cd
        const cdWidth = cd.offsetWidth

        // Xử lý CD quay khi song
        //  animate() trả lại một đối tượng Animation >> lưu vào biến
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10seconds ,tốc độ quay
            iterations: Infinity // lặp lại bao nhiêu lần
        })
        cdThumbAnimate.pause()

        // Xử lý Phóng to / thu nhỏ CD
        document.onscroll = function () {
            // windown > đại diện cho cửa sổ trình duyệt
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xủ lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // Khi song được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Khi song bị pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }


        // Khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                progress.value = progressPercent
            }
        }

        // Xử  lý khi tua song
        //  oninput được kích hoạt khi người dùng nhập hoặc thay đổi <input> và <textarea>.
        //  oninput diễn ra ngay khi giá trị của thẻ thay đổi . onchange diễn ra khi bạn chuyển trỏ chuột sang một thành phần khác. 
        progress.oninput = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime

        }


        // Khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
        // Khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()

            }
            _this.render()
            audio.play()
            _this.scrollToActiveSong()

        }

        // xử lý random bật tắt
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            this.classList.toggle('active', _this.isRandom)

        }

        // xử lý lặp lại song
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            this.classList.toggle('active', _this.isRepeat)

        }

        // xủ lý next song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click();
            }
        }

        // lăng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNotActive = e.target.closest('.song:not(.active)')
            // target mục tiêu bạn click vào 
            // closest >> trả về element 1 là chính nó ,2 là thẻ cha nó , k tìm thấy trả về null
            if (
                // kiểm tra có phải .song k >> mà k có .active  hoạc có option thì cho nó vào
                songNotActive || e.target.closest('.option')
            ) {
                // xủ lý khi click vào song
                if (songNotActive) {
                    // songNotActive.getAttribute('data-index')
                    // mục đính đặt data-... >> sử dụng dataset 
                    _this.currentIndex = Number(songNotActive.dataset.index)
                    _this.loadCurrentSongs()
                    _this.render()
                    audio.play()
                }

            }
        }
    },
    // kéo khi next
    scrollToActiveSong() {
        // cánh 1
        // setTimeout(() => {
        //     $('.song.active').scrollIntoView({
        //         behavior: 'smooth',
        //         block: 'nearest',
        //     });
        // }, 300);
        // if ($(".song.active").offsetTop <= 203) {
        //     window.scrollTo({ top: 408 + "px", behavior: "smooth" });
        // }

        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }, 300);
    },

    loadCurrentSongs() {
        heading.textContent = this.currentSongs.name
        cdThumb.style.backgroundImage = `url('${this.currentSongs.image}')`
        audio.src = this.currentSongs.path
    },
    loadConfig() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        // assisn để gán để hợp nhất
        // Object.assign(this,this.config)
    },
    // Hàm next
    nextSong() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
            // window.scrollTo({ top: 400 + 'px', behavior: 'smooth' })
        }
        // khi net sẽ cập  nhật lại thông tin mới
        this.loadCurrentSongs();

    },

    // Hàm prev
    prevSong() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        // khi net sẽ cập  nhật lại thông tin mới
        this.loadCurrentSongs();
    },

    // Hàm xủ lý ranDom Song

    playRandomSong() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex
        this.loadCurrentSongs();

    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        // Ngay từ start thì định nghĩa ra thuộc tính cho Object
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện (DOM events) 
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy
        this.loadCurrentSongs();

        // Render playlist
        this.render();
        // // cái hiện thị trạng thái ban đầu của button repeat và random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    }
}
app.start()