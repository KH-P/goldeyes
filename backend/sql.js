let where_news = "\
title not like '%실종자%' \
and title not like '%얼었다%' \
and description not like '%유튜브로 중계%' \
and title not like '%후지산%' \
and title not like '%무료%' \
and title not like '%이루다%' \
and description not like '%일본기상청%' \
and description not like '%NHK%' \
and description not like '%화재·산불%' \
and title not like '%리포트%' \
and description not like '%관련 상담%' \
and description not like '%수요가 폭발%' \
and description not like '%직접 전화%' \
and title not like '%부고%' \
and description not like '%일본 지진%' \
and description not like '%외국 관측%' \
and description not like '%화재는 물론%' \
and description not like '%문의 전화%' \
and description not like '%전문 유튜브%' \
and description not like '%상습침수%' \
and title not like '%선거법%' \
and description not like '%국제통화%' \
and description not like '%소방공무%' \
and description not like '%소방안전%' \
and description not like '%정전출금%' \
and description not like '%不通%' \
and description not like '%화재 대비%' \
and description not like '%전화한 사람%' \
and description not like '%법정 소송%' \
and title not like '%지진 전조%' \
and title not like '%총파업%' \
and description not like '%최근 유튜브%' \
and description not like '%계약해지%' \
and description not like '%별세%' \
and description not like '%민주노총%' \
and description not like '%지진 분석%' \
and description not like '%전화 신청%' \
and description not like '%불통행정%' \
and title not like '%사건 사고%' \
and description not like '%사건 사고%' \
and description not like '%피해 규모는%' \
and description not like '%폭발적%' \
and description not like '%페루%' \
and description not like '%通貨%' \
and description not like '%카카오 주가%' \
and title not like '%대체로 맑음%' \
and description not like '%카카오톡 단체대화%' \
and description not like '%유튜브를 통한%' \
and description not like '%각종 화재%' \
and description not like '%EBS 강좌%' \
and description not like '%카카오톡 오픈채팅%' \
and description not like '%지진 관측망%' \
and title not like '%단독 표지%' \
and description not like '%단독 표지%' \
and title not like '%찾아요%' \
and description not like '%산불 발생 위험%' \
and description not like '%넷플릭스 HDR%' \
and description not like '%카카오톡을 통해%' \
and title not like '%단독 회차%' \
and title not like '%단독회차%' \
and title not like '%단독 공연%' \
and description not like '%단독 공연%' \
and description not like '%단독 티켓%' \
and description not like '%출연한%' \
and description not like '%산불감시%' \
and description not like '%카카오의 콘텐츠%' \
and description not like '%USGS%' \
and description not like '%오징어 게임%' \
and description not like '%침수방지%' \
and title not like '%좋아요%' \
and description not like '%단독으로%' \
and description not like '%자회사%' \
";

module.exports = {
    newsList : {
        query: "SELECT * FROM NEWS.tbl_news WHERE "+where_news+" order by pubdate desc limit 20"
    },
    newsCount : {
        query: "SELECT keyword,count(*) cnt FROM (SELECT keyword FROM NEWS.tbl_news WHERE "+where_news+" Order by pubdate desc limit 20) t\
        group by keyword order by cnt desc"
    },
    eqkList : {
        query: "SELECT * FROM NEWS.tbl_eqk WHERE fctp!=2 and datetime > date_format(date_add(now(),interval +9 hour),'%Y-%m-%d 00:00:00') order by datetime desc,tmeqk desc"
    },
    frstList : {
        query: "SELECT * FROM NEWS.tbl_frst WHERE (city1='부산광역시' or city1='울산광역시' or city1='경상남도') and state='진화중' and tmfrst > date_format(date_add(now(),interval +9 hour),'%Y-%m-%d 00:00:00') order by tmfrst desc,datetime desc"
    },
    carsList : {
        query: "SELECT * FROM POWER.tbl_cars"
    },
    buildsList : {
        query: "SELECT * FROM POWER.tbl_builds"
    },

    bs_newsList : {
        query: "SELECT * FROM NEWS.tbl_news WHERE "+where_news+" and area in ('all','bs') order by pubdate desc limit 20"
    },
    bs_newsCount : {
        query: "SELECT keyword,count(*) cnt FROM (SELECT keyword FROM NEWS.tbl_news WHERE "+where_news+" and area in ('all','bs') Order by pubdate desc limit 20) t\
        group by keyword order by cnt desc"
    },
    bs_frstList : {
        query: "SELECT * FROM NEWS.tbl_frst WHERE (city1='부산광역시' or city1='울산광역시' or city1='경상남도') and state='진화중' and tmfrst > date_format(date_add(now(),interval +9 hour),'%Y-%m-%d 00:00:00') order by tmfrst desc,datetime desc"
    },

    dg_newsList : {
        query: "SELECT * FROM NEWS.tbl_news WHERE "+where_news+" and area in ('all','dg') order by pubdate desc limit 20"
    },
    dg_newsCount : {
        query: "SELECT keyword,count(*) cnt FROM (SELECT keyword FROM NEWS.tbl_news WHERE "+where_news+" and area in ('all','dg') Order by pubdate desc limit 20) t\
        group by keyword order by cnt desc"
    },
    dg_frstList : {
        query: "SELECT * FROM NEWS.tbl_frst WHERE (city1='대구광역시' or city1='경상북도') and state='진화중' and tmfrst > date_format(date_add(now(),interval +9 hour),'%Y-%m-%d 00:00:00') order by tmfrst desc,datetime desc"
    },
}