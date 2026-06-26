<script setup lang="ts">
import { ref, watch } from "vue";

// import { useLocalStorage } from "@vueuse/core";

/**
 * Нужно руками читать значение при старте.
 * Нужно руками записывать значение при изменении.
 * Нужно помнить, что localStorage хранит только строки.
 * Код повторяется в каждом компоненте.
 * Легко ошибиться с ключом или забыть watch.
 */
const userName = ref(localStorage.getItem("user-name") || "John");

watch(userName, (value) => {
	localStorage.setItem("user-name", value);
});

// const userName = useLocalStorage("user-name", "John");

const nativeUserName = localStorage.getItem("native-user-name") || "John";

const changeNativeUserName = (event: Event) => {
	const input = event.target as HTMLInputElement;

	localStorage.setItem("native-user-name", input.value);
};
</script>

<template>
	<section class="lesson">
		<h1>VueUse: useLocalStorage</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Имя пользователя</span>
				<input v-model="userName" placeholder="Введите имя" />
			</div>

			<div class="code-block code-block--success">
				<span>Значение из localStorage</span>
				<pre>{{ userName }}</pre>
			</div>
		</div>

		<div class="code-block code-block--example">
			<span>Нативный localStorage не реактивен</span>

			<input :value="nativeUserName" placeholder="Введите имя" @input="changeNativeUserName" />

			<pre>{{ nativeUserName }}</pre>
		</div>
	</section>
</template>
