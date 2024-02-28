<template>
    <div>
        <div class="bg-container">
            <div class="container-fluid">
                <ModalView v-if="isModalViewed['지진']" @close-modal="isModalViewed['지진'] = false">
                    <div class="modal-title p-2 fs-5 fw-bold border-bottom under-shadow">
                        <span class="bg-primary rounded me-2 text-primary">.</span>지진 발생
                    </div>
                    <div class="modal-body">
                        <div class="desc">
                            <div><span class="desc-t">규모</span>{{eqkList[0].mt}}</div>
                            <div><span class="desc-t">시간</span>{{eqkList[0].tmeqk}}</div>
                            <div><span class="desc-t">장소</span>{{eqkList[0].loc}}</div>
                            <div><span class="desc-t">위치</span>{{eqkList[0].lat}} , {{eqkList[0].lon}} (lat, lng)</div>
                            <div><span class="desc-t">내용</span>{{eqkList[0].rem}}</div>
                        </div>
                        <div class="p-2 pt-3"><img class="desc-image" v-bind:src="eqkList[0].img"/></div>
                    </div>                  
                </ModalView>
                <ModalView v-if="isModalViewed['산불']" @close-modal="isModalViewed['산불'] = false">
                    <div class="modal-title p-2 fs-5 fw-bold border-bottom under-shadow">
                        <span class="bg-primary rounded me-2 text-primary">.</span>산불 발생
                    </div>
                    <div class="modal-body">
                        <div class="desc">
                            <div><span class="desc-t">시간</span>{{frstList[0].tmfrst}}</div>
                            <div><span class="desc-t">장소</span>{{frstList[0].addr}}</div>
                            <div><span class="desc-t">위치</span>{{frstList[0].lat}} , {{frstList[0].lng}} (lat, lng)</div>
                            <div><span class="desc-t">내용</span>{{frstList[0].state}}</div>
                        </div>
                        <!--div class="p-2 pt-3"><img class="desc-image" v-bind:src="eqkList[0].img"/></div>-->
                    </div>                  
                </ModalView>

                <div class="position-fixed top-0 end-0 p-3 mt-5" style="z-index: 11">
                    <div
                        id="liveToast"
                        class="toast"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true" data-bs-delay="10000" data-bs-autohide="false">
                        <div class="toast-header">
                            <div class="bg-primary rounded me-2">.</div>
                            <strong class="me-auto">Notification</strong>
                            <small>sound</small>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="toast"
                                aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            가청을 위해 상단 스위치버튼을 <span class="text-primary fw-bold">Turn On</span> 해 주세요.
                        </div>
                    </div>
                </div>
                <div class="main-wrapper">
                    <div class="left"></div>
                    <main>
                        <div class="main__video">
                            <div class="main__video-container">
                                <iframe
                                    :src="'https://www.youtube.com/embed/' + videoId"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen="allowfullscreen"></iframe>
                                    <!-- <iframe
                                    :src="'https://www.youtube.com/embed/' + videoId" 
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                    ></iframe> -->
                                    <!-- <YouTube 
                                        width="100%"
                                        height="450"
                                        src="https://www.youtube.com/watch?v=6QZ_qc75ihU" 
                                        @ready="onReady"
                                        ref="youtube" /> -->
                            </div>
                            <div class="main__description d-flex justify-content-between">
                                <p>
                                    <i class="fas fa-podcast"></i>
                                    LIVE NEWS</p>
                                <p class="fw-bold">ON AIR</p>
                            </div>
                            <div class="main__sub-description">
                                <div class="summary shadow-sm rounded bg-white row row-cols-1 row-cols-lg-2">
                                    <div class="summary-wrap">
                                        <div class="col d-flex align-items-start">
                                            <div class="icon-square text-dark flex-shrink-0 me-3">
                                                <i class="fas fa-tv"></i>
                                            </div>
                                            <div class="summary-title">
                                                <h5>
                                                    <b>뉴스</b>
                                                </h5>
                                                <p>MAIN 뉴스 키워드 리스트</p>
                                            </div>
                                            <div class="ms-auto summary-count">{{newsList.length}}
                                                건</div>
                                        </div>
                                        <div class="summary-list">
                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item list-group-item-action" v-on:click="showKey[i] = !showKey[i]"
                                                    :key="i"
                                                    v-for="(newsCnt,i) in newsCount">
                                                    <div class=" d-flex justify-content-between align-items-center">
                                                    {{newsCnt.keyword}}
                                                    <span class="badge rounded-pill" :class="[newsCnt.cnt>=10? 'bg-danger':'bg-primary']">{{newsCnt.cnt}}</span>
                                                    </div>
                                                    <transition class="m-1 ps-3" name="fade">
                                                        <div v-if="showKey[i]">
                                                            <div :key="j" v-for="(news,j) in newsList">
                                                                <div class="clamp" v-if="newsCnt.keyword==news.keyword"><i class="fas fa-square fa-sm"></i> {{news.title}}</div>
                                                            </div>
                                                        </div>
                                                    </transition>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="summary-wrap">
                                        <div class="col d-flex align-items-start">
                                            <div class="icon-square text-dark flex-shrink-0 me-3">
                                                <i class="fas fa-exclamation-triangle"></i>
                                            </div>
                                            <div class="summary-title">
                                                <h5>
                                                    <b>재해</b>
                                                </h5>
                                                <p>MAIN 재해 실시간 리스트</p>
                                            </div>
                                            <div class="ms-auto summary-count">{{eqkList.length+frstList.length}} 건</div>
                                        </div>
                                        <div class="summary-list">
                                            <ul class="list-group">
                                                <li class="list-group-item list-group-item-action" v-on:click="showKey['지진'] = !showKey['지진']">
                                                    <div class=" d-flex justify-content-between align-items-center">
                                                    지진
                                                    <span class="badge rounded-pill" :class="[eqkList.length>0? 'bg-danger':'bg-primary']">{{eqkList.length}}</span>
                                                    </div>
                                                    <transition class="m-1 ps-3" name="fade">
                                                        <div v-if="showKey['지진'] && eqkList.length>0">
                                                            <div :key="j" v-for="(eqk,j) in eqkList">
                                                                <div class="clamp"><i class="fas fa-square fa-sm"></i> [규모 {{eqk.mt}}] {{eqk.loc}}</div>
                                                                <div class="desc ps-3">{{eqk.tmeqk}}</div>
                                                            </div>
                                                        </div>
                                                    </transition>
                                                </li>
                                                <li class="list-group-item list-group-item-action" v-on:click="showKey['산불'] = !showKey['산불']">
                                                    <div class=" d-flex justify-content-between align-items-center">
                                                    산불
                                                    <span class="badge rounded-pill" :class="[frstList.length>0? 'bg-danger':'bg-primary']">{{frstList.length}}</span>
                                                    </div>
                                                    <transition class="m-1 ps-3" name="fade">
                                                        <div v-if="showKey['산불'] && frstList.length>0">
                                                            <div :key="j" v-for="(frst,j) in frstList">
                                                                <div class="clamp"><i class="fas fa-square fa-sm"></i> [{{frst.state}}] {{frst.addr}}</div>
                                                                <div class="desc ps-3">{{frst.tmfrst}}</div>
                                                            </div>
                                                        </div>
                                                    </transition>
                                                </li>
                                                <li
                                                    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                                    낙뢰
                                                    <span class="badge bg-primary rounded-pill">0</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside class="aside">

                            <div class="shadow-sm rounded news">
                                <div class="aside__top-container d-flex justify-content-between">
                                    <p>Most Recent</p>
                                    <img width="30" height="30" title="Success" src="../assets/image/earth.gif"/>
                                </div>

                                <li class="news-item" :key="i" v-for="(news,i) in newsList">
                                    <div class="news-title-wrap d-flex justify-content-between align-items-start">
                                        <div class="news-title clamp" v-bind:id="'ans-'+i">
                                            <span class="badge bg-danger">{{news.keyword}}</span>
                                            <a v-bind:href="news.link" target='_blank'>
                                                <span class="new-string">{{newString[i]}}</span>{{news.title}}
                                            </a>
                                        </div>
                                        <button class="btn btn-more" v-bind:id="'que-'+i" @click="newsClickClamp">
                                            <i class="fas fa-caret-down"></i>
                                        </button>
                                    </div>
                                    <div class="news-sub-wrap d-flex justify-content-between">
                                        <div class="news-by d-flex align-items-baseline">
                                            <span>
                                                <i class="fas fa-globe"></i>
                                                {{news.author}}
                                                #{{news.keyword2}}</span>
                                        </div>
                                        <a v-bind:href="'javascript:window.open(\'/view/sms.html?keyword='+news.keyword+'&datetime='+news.datetime+'&author='+news.author+'&link='+news.link+'\', \'popup\', \'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no\');'">
                                            <button type="button" class="btn btn-outline-secondary btn-sm news-sms">SMS</button>
                                        </a>
                                    </div>
                                    <div class="news-content d-flex justify-content-between">
                                        <img class="news-thumnail" v-bind:src="news.thumbnail"/>
                                        <div class="news-text-wrap d-flex flex-column">
                                            <span class="news-text">{{news.description}}</span>
                                            <div class="pubdate">
                                                <i class="far fa-clock"></i>
                                                {{news.pubdate}}</div>
                                        </div>
                                    </div>
                                </li>

                            </div>
                            <div class="aside__more">
                                <a href="#">SHOW MORE</a>
                                <!-- <audio id="audio" autoplay controls> <source src="" type="audio/mp3"/>
                                </audio> -->
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import YouTube from 'vue3-youtube'
    import ModalView from "../components/ModalView";
    export default {
        components: {
            ModalView,
            // YouTube 
        },
        data() {
            return {
                newsList: [], 
                newsCount: [], eqkList: [], frstList: [], newString: [], 
                isModalViewed: [], showKey: [], showTitle: [],
                videoId: '',
                getVideoId: [],
                intervalId: null, 
                }
        },
        created() {
            this.getNewsList();
            console.log(process.env);
        },
        beforeUnmount() {        
            // setInterval 중지
            clearInterval(this.intervalId);
        },
        methods: {
            async getNewsList() {
                let today = new Date();
                var timeDiff;
                var audio;
                this.newsCount = await this.$api("/api/bs_newsCount", {});
                this.newsList = await this.$api("/api/bs_newsList", {});
                this.eqkList = await this.$api("/api/eqkList", {});
                this.frstList = await this.$api("/api/bs_frstList", {});
                this.getVideoId = await this.$api("/api/newsTargetValue", {cmd : "get", target : "youtubeId"});
                this.videoId = this.getVideoId[0]['value']
                var flag_sound = document
                    .querySelector('#alarm_onoff')
                    .checked;

                // 뉴스 가청
                let j = 0;
                for (let i = 0; i < this.newsList.length; i++) {
                    timeDiff = (Date.parse(today) - Date.parse(this.newsList[i].datetime)) / 1000;
                    /*
                    if(!this.showTitle[this.newsList[i].keyword]) this.showTitle[this.newsList[i].keyword] = "";
                    this.showTitle[this.newsList[i].keyword] += this.newsList[i].title+"<br/>";
                    console.log(this.showTitle["화재"]);
                    */
                    if (i == 0) 
                        console.log(timeDiff);
                    if (timeDiff < 60 && j == 0) {
                        this.newString[i] = "[NEW] ";
                        if (flag_sound) {
                            audio = new Audio("dingdong.wav");
                            audio.play();
                            audio.onended = () => {
                                new Audio(
                                    "http://132.226.173.98:8080/api/hear?lang=ko&text=" + this.newsList[i].keyword +
                                    ", " + this.newsList[i].title
                                ).play();
                            };
                            flag_sound = false;
                        }
                        j = j + 1;
                    } else {
                        this.newString[i] = "";
                    }
                }

                // 지진 모달
                if(this.eqkList.length > 0 && flag_sound){
                    timeDiff = (Date.parse(today) - Date.parse(this.eqkList[0].datetime)) / 1000;
                    console.log(timeDiff);
                    if (timeDiff < 60) {
                        this.isModalViewed['지진'] = true;
                        audio = new Audio("dingdong.wav");
                        audio.play();
                        audio.onended = () => {
                            new Audio(
                                "http://132.226.173.98:8080/api/hear?lang=ko&text=지진, " + this.eqkList[0].loc + ", 규모 " + this.eqkList[0].mt + " 지진 발생"
                            ).play();
                        };
                    }
                }

                // 산불 모달
                if(this.frstList.length > 0 && flag_sound && this.frstList[0].state=="진화중"){
                    timeDiff = (Date.parse(today) - Date.parse(this.frstList[0].datetime)) / 1000;
                    console.log(timeDiff);
                    if (timeDiff < 60) {
                        this.isModalViewed['산불'] = true;
                        audio = new Audio("dingdong.wav");
                        audio.play();
                        audio.onended = () => {
                            new Audio(
                                "http://132.226.173.98:8080/api/hear?lang=ko&text=산불, " + this.frstList[0].addr + ", 산불 진화중"
                            ).play();
                        };
                    }
                }
            },
            newsClickClamp: function (event) {
                const targetId = event.currentTarget.id;
                document
                    .querySelector('#' + targetId)
                    .classList
                    .toggle('clicked');
                document
                    .querySelector('#' + targetId.replace('que', 'ans'))
                    .classList
                    .toggle('clamp');
            },
            startInterval() {
                // 1분마다 getNewsList 호출하도록 setInterval 설정
                this.intervalId = setInterval(this.getNewsList, 60000);
            },
        },
        computed: {
        },
        mounted() {
            this.startInterval();
        }
    }
</script>