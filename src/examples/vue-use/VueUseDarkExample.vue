<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { ref } from "vue";

/**
 * Тёмная тема обычно требует сразу несколько действий:
 *
 * 1. Хранить текущее состояние: светлая или тёмная тема.
 * 2. Добавлять CSS-класс на страницу.
 * 3. Сохранять выбор пользователя в localStorage.
 * 4. При следующем открытии страницы читать сохранённое значение.
 *
 * useDark делает эту работу за нас.
 */
const isDark = useDark({
	storageKey: "vue-lessons-color-scheme",
	initialValue: "light",
});

const toggleDark = () => {
	isDark.value = !isDark.value;
};

/**
 * Ниже та же задача, но без VueUse.
 *
 * Здесь всё нужно делать руками:
 * менять ref,
 * добавлять или удалять класс на html,
 * сохранять значение в localStorage,
 * читать сохранённое значение при старте.
 */
const nativeThemeKey = "native-color-scheme";
const nativeIsDark = ref(localStorage.getItem(nativeThemeKey) === "dark");

const applyNativeTheme = () => {
	document.documentElement.classList.toggle("native-dark", nativeIsDark.value);
	localStorage.setItem(nativeThemeKey, nativeIsDark.value ? "dark" : "light");
};

applyNativeTheme();

const toggleNativeDark = () => {
	nativeIsDark.value = !nativeIsDark.value;
	applyNativeTheme();
};
</script>

<template>
	<section class="lesson">
		<h1>VueUse: useDark</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Тема через VueUse</span>

				<button type="button" @click="toggleDark">Переключить тему</button>
			</div>

			<div class="code-block code-block--success">
				<span>Статус</span>
				<pre>{{ isDark ? "Тёмная тема" : "Светлая тема" }}</pre>
			</div>
		</div>

		<div class="workspace workspace--example">
			<div class="code-block">
				<span>Реализация руками</span>

				<button type="button" @click="toggleNativeDark">Переключить тему</button>
			</div>

			<div class="code-block code-block--success">
				<span>Статус</span>
				<pre>{{ nativeIsDark ? "Тёмная тема" : "Светлая тема" }}</pre>
			</div>
		</div>
	</section>
</template>
