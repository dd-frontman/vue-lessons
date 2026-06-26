<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { ref } from "vue";

/**
 * Debounce — это задержка выполнения функции.
 *
 * Частый пример — поиск.
 * Пользователь печатает быстро: "v", "vu", "vue".
 * Без debounce мы можем отправить 3 запроса подряд.
 *
 * С debounce запрос выполнится только после паузы:
 * пользователь перестал печатать на 600 мс — тогда запускаем поиск.
 */

const simpleSearch = ref("");
const simpleSearchResult = ref("Введите текст для поиска");
const simpleRequestCount = ref(0);

/**
 * Пример без debounce.
 *
 * Функция запускается на каждый input.
 * Если пользователь быстро введёт "vue",
 * функция выполнится 3 раза: "v", "vu", "vue".
 */
const runSimpleSearch = () => {
	simpleRequestCount.value += 1;
	simpleSearchResult.value = `Запрос выполнен: ${simpleSearch.value || "пустая строка"}`;
};

const search = ref("");
const searchResult = ref("Введите текст для поиска");
const requestCount = ref(0);

const runSearch = () => {
	requestCount.value += 1;
	searchResult.value = `Запрос выполнен: ${search.value || "пустая строка"}`;
};

/**
 * useDebounceFn — готовый composable из VueUse.
 *
 * Первый аргумент — функция, которую нужно выполнить с задержкой.
 * Второй аргумент — задержка в миллисекундах.
 *
 * Если вызвать debouncedSearch несколько раз подряд,
 * VueUse отменит предыдущие вызовы и оставит только последний.
 */
const debouncedSearch = useDebounceFn(runSearch, 600);

const nativeSearch = ref("");
const nativeSearchResult = ref("Введите текст для поиска");
const nativeRequestCount = ref(0);

let timer: ReturnType<typeof setTimeout> | null = null;

const runNativeSearch = () => {
	nativeRequestCount.value += 1;
	nativeSearchResult.value = `Запрос выполнен: ${nativeSearch.value || "пустая строка"}`;
};

/**
 * Ниже тот же debounce, но без VueUse.
 *
 * Здесь всё нужно делать руками:
 * хранить timer,
 * отменять старый setTimeout через clearTimeout,
 * создавать новый setTimeout после каждого ввода.
 */
const nativeDebouncedSearch = () => {
	if (timer) {
		clearTimeout(timer);
	}

	timer = setTimeout(() => {
		runNativeSearch();
		timer = null;
	}, 600);
};
</script>

<template>
	<section class="lesson">
		<h1>VueUse: useDebounceFn</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Поиск без debounce</span>

				<input
					v-model="simpleSearch"
					placeholder="Введите поисковый запрос"
					@input="runSimpleSearch"
				/>
			</div>

			<div class="code-block code-block--success">
				<span>Результат</span>
				<pre>
Результат: {{ simpleSearchResult }}
Запросов: {{ simpleRequestCount }}</pre
				>
			</div>
		</div>

		<div class="workspace workspace--example">
			<div class="code-block">
				<span>Поиск через VueUse</span>

				<input v-model="search" placeholder="Введите поисковый запрос" @input="debouncedSearch" />
			</div>

			<div class="code-block code-block--success">
				<span>Результат</span>
				<pre>
Результат: {{ searchResult }}
Запросов: {{ requestCount }}</pre
				>
			</div>
		</div>

		<div class="workspace workspace--example">
			<div class="code-block">
				<span>Реализация руками</span>

				<input
					v-model="nativeSearch"
					placeholder="Введите поисковый запрос"
					@input="nativeDebouncedSearch"
				/>
			</div>

			<div class="code-block code-block--success">
				<span>Результат</span>
				<pre>
Результат: {{ nativeSearchResult }}
Запросов: {{ nativeRequestCount }}</pre
				>
			</div>
		</div>
	</section>
</template>
