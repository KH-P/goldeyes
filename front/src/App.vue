<template>
  <header class="d-flex bg-white sticky-top">
    <div class="logo">
      <button
        class="navbar-toggler header-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <i class="fas fa-bars" style="font-size: 1.4rem;"></i>
      </button>
      <span class="title">
        GOLD EYES
        <i class="fas fa-pen fa-sm"></i>
      </span>
      <div class="right"></div>
    </div>
    <div class="icons text-secondary d-flex align-items-center ms-auto">
      <span class="alarm_onoff" :class="{'alarm_onoff_on': alarm_text === 'ON' }">{{alarm_text}}</span>
      <label class="switch">
        <input type="checkbox" id="alarm_onoff" @click="check" />
        <span class="slider"></span>
      </label>
    </div>
  </header>

  <div class="d-md-flex" id="sidebar">
    <ul class="nav flex-column flex-nowrap">
      <li class="nav-item nav-menu">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i class="fas fa-bars" style="font-size: 1.4rem;"></i>
        </button>
      </li>
      <li class="nav-item ho">
        <router-link class="nav-link" to="/">
          <i class="fas fa-tv fa-lg"></i>
          <p>부산/경남</p>
        </router-link>
      </li>
      <li class="nav-item ho">
        <router-link class="nav-link" to="/dg">
          <i class="fas fa-tv fa-lg"></i>
          <p>대구/경북</p>
        </router-link>
      </li>
      <li class="nav-item ho">
        <router-link class="nav-link" to="/cc">
          <i class="fas fa-tv fa-lg"></i>
          <p>충남/충북</p>
        </router-link>
      </li>
      <li class="nav-item ho">
        <router-link class="nav-link" to="/gb">
          <i class="fas fa-tv fa-lg"></i>
          <p>강북/강원</p>
        </router-link>
      </li>
      <!-- <li class="nav-item ho">
                <router-link class="nav-link" to="/Weather">
                    <i class="fas fa-globe-americas fa-lg"></i>
                    <p>WEATHER</p>
                </router-link>
            </li>
            <li class="nav-item ho">
                <router-link class="nav-link" to="/">
                    <i class="fas fa-biohazard fa-lg"></i>
                    <p>COVID</p>
                </router-link>
      </li>-->
    </ul>
  </div>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel"
  >
    <div class="offcanvas-header justify-content-between">
      <span class="title">
        GOLD EYES
        <i class="fas fa-pen fa-sm"></i>
      </span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav justify-content-end flex-grow-1">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">부산/경남</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/dg">대구/경북</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/cc">충남/충북</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/gb">강북/강원</router-link>
        </li>
        <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/Weather">WEATHER</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/">COVID</router-link>
        </li>-->
        <!-- <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="offcanvasNavbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu mb-2" aria-labelledby="offcanvasNavbarDropdown">
                        <li>
                            <a class="dropdown-item" href="#">Action</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Another action</a>
                        </li>
                        <li>
                            <hr class="dropdown-divider"/>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </li>
                    </ul>
        </li>-->
      </ul>
    </div>
    <div class="youtube-input-bottom">
      <div class="input-group mb-3">
        <input
          type="text"
          style="width:160px;"
          class="form-control"
          placeholder="YoutubeID"
          aria-label="YoutubeID"
          aria-describedby="button-addon2"
          v-model="videoId"
        />
        <button class="btn btn-outline-secondary" type="button" @click="setValue">save</button>
      </div>
    </div>
  </div>

  <footer class="footer fixed-bottom flex-row justify-content-evenly align-items-center">
    <div class="item">
      <router-link to="/" class="item-link">
        <i class="fas fa-tv fa-lg"></i>
        <p>부산/경남</p>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/dg" class="item-link">
        <i class="fas fa-tv fa-lg"></i>
        <p>대구/경북</p>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/cc" class="item-link">
        <i class="fas fa-tv fa-lg"></i>
        <p>충남/충북</p>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/gb" class="item-link">
        <i class="fas fa-tv fa-lg"></i>
        <p>강북/강원</p>
      </router-link>
    </div>
    <!-- <div class="item">
            <router-link to="/Weather" class="item-link">
                <i class="fas fa-globe-americas fa-lg"></i>
                <p>WEATHER</p>
            </router-link>
        </div>
        <div class="item">
            <router-link to="/" class="item-link">
                <i class="fas fa-biohazard fa-lg"></i>
                <p>COVID</p>
            </router-link>
    </div>-->
  </footer>
  <router-view />
</template>

<style>
@import "./assets/styles/fontawesome-free-5.15.4-web/css/all.min.css";
@import "./assets/styles/ge_news.css";
@import "./assets/styles/ge_nav.css";
</style>

<script>
export default {
  data() {
    return { alarm_text: "OFF",videoId: '',
                getVideoId: [], };
  },
  created() {
    this.getData();
    console.log(process.env);
  },
  methods: {
    check: function(e) {
      //console.log(e.target.checked);
      if (e.target.checked) {
        this.alarm_text = "ON";
      } else {
        this.alarm_text = "OFF";
      }
    },
    async getData() {
        this.getVideoId = await this.$api("/api/newsTargetValue", {cmd : "get", target : "youtubeId"});
        this.videoId = this.getVideoId[0]['value']
    },
    async setValue() {
        const isConfirmed = prompt("비밀번호를 입력하세요.");
        if (isConfirmed === "kt010123$") {
            await this.$api("/api/newsTargetValue", {cmd : "set", target : "youtubeId", value : this.videoId});
            alert("변경완료.")
        } else {
            alert("비밀번호 불일치.")
        }
    },
  }
};
</script>