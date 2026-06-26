<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";

/**
 * Clipboard — это буфер обмена пользователя.
 * Туда попадает текст, когда мы нажимаем Cmd+C / Ctrl+C.
 *
 * В браузере для работы с буфером обмена есть Clipboard API:
 * navigator.clipboard.writeText("текст")
 *
 * Обычно браузер разрешает копирование только по действию пользователя:
 * например после клика по кнопке.
 */

const link = ref("https://vueuse.org/core/useClipboard/");

/**
 * useClipboard — готовый composable из VueUse.
 *
 * copy() копирует текст в буфер обмена.
 * copied показывает, что копирование недавно прошло успешно.
 * isSupported показывает, доступен ли Clipboard API в текущем браузере.
 */
const { copy, copied, isSupported } = useClipboard();

const nativeLink = ref("https://vueuse.org/core/useClipboard/");
const nativeStatus = ref("Нажмите кнопку");

/**
 * Ниже тот же пример, но без VueUse.
 *
 * Здесь всё нужно делать руками:
 * проверять поддержку Clipboard API,
 * вызывать navigator.clipboard.writeText(),
 * хранить статус,
 * обрабатывать ошибку через try/catch.
 */
const copyNativeLink = async () => {
	// В старых браузерах или небезопасном контексте Clipboard API может быть недоступен.
	if (!navigator.clipboard) {
		nativeStatus.value = "Clipboard API не поддерживается";
		return;
	}

	try {
		// Пишем текущее значение input в буфер обмена пользователя.
		await navigator.clipboard.writeText(nativeLink.value);
		nativeStatus.value = "Скопировано";
	} catch {
		// Например, браузер может запретить доступ к буферу обмена.
		nativeStatus.value = "Не удалось скопировать";
	}
};
</script>

<template>
	<section class="lesson">
		<h1>VueUse: useClipboard</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Ссылка для копирования</span>

				<input v-model="link" placeholder="Введите ссылку" />

				<button type="button" :disabled="!isSupported" @click="copy(link)">Скопировать</button>
			</div>

			<div class="code-block code-block--success">
				<span>Статус</span>
				<pre>{{ copied ? "Скопировано" : "Нажмите кнопку" }}</pre>
			</div>
		</div>

		<div class="workspace workspace--example">
			<div class="code-block">
				<span>Реализация руками</span>

				<input v-model="nativeLink" placeholder="Введите ссылку" />

				<button type="button" @click="copyNativeLink">Скопировать</button>
			</div>

			<div class="code-block code-block--success">
				<span>Статус</span>
				<pre>{{ nativeStatus }}</pre>
			</div>
		</div>
	</section>
</template>
