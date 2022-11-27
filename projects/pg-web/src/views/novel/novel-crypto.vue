<script lang="ts" setup name="novel-crypto">
import { ref } from 'vue';

import { apiAddCryptoNovel, apiListCryptoNovel, apiLoadCryptoNovel } from './service';

const list = ref([]);

function add() {
  const filename = '测试小说';
  const content = `天还未破晓，晚秋凌晨的寒气正浓郁，四下还是漆黑一片。

罗家的地窖之中一盏油灯已悄然点亮，少年罗征将油灯的光芒遮住大半，端坐在桌前，悄悄的抽出一本破旧的线装书。

罗征今年刚满十七，身材削瘦，模样谈不上英俊，可是身上有一种柔和的气质，特别是一双眼睛十分有神，即便在昏暗如萤火的油灯之下，双目亦熠熠生辉。

“这本《天论问宪》我花了一个月时间才看完，其中道理讲的都好，可唯独‘以德报怨’这四个字，我万万不能苟同！”罗征轻声低语，看着豆丁大的灯焰，脸上透出哀伤的神色：“若不是父亲宅心仁厚，信了这四个字，我长房一脉也不会落到如此下场，父亲更加不会死去……”

思索良久，地窖门口忽然传来一阵开锁的声音，罗征顿时将眼中的哀伤神色一扫而空，取而代之的是满脸的坚毅，同时敏捷的把油灯吹灭，再将破旧的棉被蒙在了自己身上。

地窖的锁被打开，几个脚步声由远及近，为首的一人走上前来，一脚踩踏在罗征的床上，尖着嗓子喊道：“还在睡？给老子起来，还他妈以为自己是罗家的大少爷？”

这人是罗家的一位管事，长的尖嘴猴腮，额头上还生了一个瘤子，一眼看上去让人心生厌恶。`;
  apiAddCryptoNovel(filename, content);
}

function apiList() {
  apiListCryptoNovel().then((response) => {
    list.value = response;
  });
}

function load() {
  apiLoadCryptoNovel().then((res) => {
    console.warn(res);
  });
}
</script>

<template>
  <div>
    <div>novel-crypto</div>
    <button @click="add">add</button>

    <button @click="apiList">list</button>
    <button @click="load">load</button>

    <div>{{ list }}</div>
  </div>
</template>
