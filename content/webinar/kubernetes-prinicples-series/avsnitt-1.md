---
title: "Introduktion till molnbaserade applikationer och Kubernetes"
section: "Design och driftsättning av skalbara applikationer på Kubernetes"
episode: "Avsnitt 1"
series: "true"
language: "Se"
date: "2023-09-18"
draft: false
tags: ["Svenska"]
card: "safespring_card_47.svg"
eventbild: ""
socialmediabild: ""
intro: 'Du kommer att lära dig om dess nyckelkomponenter, hur de samverkar för att skapa en skalbar och pålitlig infrastruktur och vad dessa komponenter motsvarar i AWS.'
sidebarlinkurl: "#"
sidebarlinkname: "Till gitrepo"
sidebarlinkurl2: "/demo"
sidebarlinkname2: "Boka demo"
nosidebar: "none"
sidebarimage: ""
videoURL: "https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/ProcessedVideos/safespring-elastisys_webcast_episode_1/master.m3u8"
thumbnail: "/img/webinar/thumbnails/kubernetes-prinicples-series-avsnitt-1.jpeg"
categories:
  - "Kategori1"
  - "Kategori2"
tags:
  - "Tag1"
  - "Tag2"
chapters:
  - title: "Introduktion"
    time: 0
    timeFormatted: "0:00"
  - title: "Avsnitt 1"
    time: 30
    timeFormatted: "0:30"
  - title: "Avsnitt 2"
    time: 60
    timeFormatted: "20:00"
  - title: "Avslutning"
    time: 120
    timeFormatted: "30:00"
---

## Avsnitt 1
### Introduktion till molnbaserade applikationer och Kubernetes.

I detta avsnitt med Gabriel Paues från Safespring och Lars Larsson från Elastisys får du en översikt över molnbaserade applikationer och en introduktion till Kubernetes. Du kommer att lära dig om dess nyckelkomponenter,hur de samverkar för att skapa en skalbar och pålitlig infrastruktur och vad dessa komponenter motsvarar i AWS.

<script>
  if (Hls.isSupported()) {
  var video = document.getElementById('myVideo');
  var hls = new Hls();
  
  // Bind händelsehanterare här
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    console.log("video och hls.js är nu bundna");
  });

  hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
    console.log("manifest är parsat, hittade " + data.levels.length + " kvalitetsnivå");
  });
  
  // Lyssna särskilt på errors
  hls.on(Hls.Events.ERROR, function (event, data) {
    if (data.fatal) {
      switch(data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          // försök återhämta nätverksfel
          console.error('nätverksfel upptäckt:', data);
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.error('mediafel upptäckt:', data);
          break;
        default:
          // kan inte återhämta okänt fel
          console.error('okänt fel upptäckt:', data);
          break;
      }
    }
  });
  
  hls.attachMedia(video);
  hls.loadSource('https://s3.sto1.safedc.net/a489f53964f14fe897308b4243d7138d:processedvideos/ProcessedVideos/safespring-elastisys_webcast_episode_1/master.m3u8');
}
</script>