<script setup lang="ts">
import { ref } from "vue";

/**
 * Задача для собеседования.
 *
 * Форма работает нестабильно и написана тяжело для поддержки.
 * Нужно найти проблемы и предложить более чистое решение.
 *
 * Это не задача на знание конкретной библиотеки.
 * Не нужно подключать vee-validate, zod или другие пакеты.
 * Цель — оптимизировать код на обычном Vue API.
 *
 * Что нужно улучшить:
 * убрать дублирование,
 * исправить ошибки валидации,
 * сделать reset предсказуемым,
 * упростить добавление новых полей.
 */

const name = ref("");
const email = ref("");
const password = ref("");

const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");

const submitResult = ref("Форма ещё не отправлялась");
const interviewNotes = `Ошибки очищаются не полностью
Пароль проверяется не по требованию
Reset оставляет часть состояния
Много отдельных ref
Валидация плохо масштабируется
Решение должно быть на обычном Vue API`;

const validate = () => {
	nameError.value = "";
	passwordError.value = "";

	if (!name.value) {
		nameError.value = "Введите имя";
	}

	if (name.value.length < 2) {
		nameError.value = "Минимум 2 символа";
	}

	if (!email.value) {
		emailError.value = "Введите email";
	}

	if (!email.value.includes("@")) {
		emailError.value = "Email должен содержать @";
	}

	if (!password.value) {
		passwordError.value = "Введите пароль";
	}

	if (password.value.length < 6) {
		passwordError.value = "Минимум 8 символов";
	}

	return !nameError.value && !emailError.value && !passwordError.value;
};

const submit = () => {
	const isValid = validate();

	if (!isValid) {
		return;
	}

	submitResult.value = JSON.stringify(
		{
			name: name.value,
			email: email.value,
			password: password.value,
		},
		null,
		2,
	);
};

const reset = () => {
	name.value = "";
	email.value = "";
	password.value = "";

	nameError.value = "";
	passwordError.value = "";
};
</script>

<template>
	<section class="lesson">
		<h1>Interview task: Vue code optimization</h1>

		<form class="workspace" @submit.prevent="submit">
			<div class="code-block">
				<span>Поломанная форма</span>

				<label class="field">
					Имя
					<input v-model="name" placeholder="John" />
					<small>{{ nameError }}</small>
				</label>

				<label class="field">
					Email
					<input v-model="email" placeholder="john@example.com" />
					<small>{{ emailError }}</small>
				</label>

				<label class="field">
					Пароль
					<input v-model="password" type="password" placeholder="Минимум 8 символов" />
					<small>{{ passwordError }}</small>
				</label>

				<button type="submit">Submit</button>
				<button type="button" @click="reset">Reset</button>
			</div>

			<div class="code-block code-block--success">
				<span>Результат</span>
				<pre>{{ submitResult }}</pre>
			</div>
		</form>

		<div class="code-block code-block--example">
			<span>Что должен заметить кандидат</span>
			<pre>{{ interviewNotes }}</pre>
		</div>
	</section>
</template>
