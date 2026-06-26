<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm } from "vee-validate";

type RegisterForm = {
	name: string;
	email: string;
	password: string;
};

/**
 * vee-validate решает задачу управления формой.
 *
 * Без библиотеки обычно приходится руками хранить:
 * значения полей,
 * ошибки,
 * состояние submit,
 * touched/dirty,
 * reset,
 * проверку перед отправкой.
 *
 * vee-validate забирает эту рутину на себя.
 */

/**
 * Важно про Zod.
 *
 * У vee-validate есть пакет @vee-validate/zod,
 * который позволяет подключить Zod-схему через toTypedSchema().
 *
 * Но актуальный @vee-validate/zod@4.15.1 требует zod@3,
 * а в проекте уже стоит zod@4.
 *
 * Поэтому здесь пример без адаптера:
 * правила валидации написаны обычными функциями.
 */

const validateName = (value: string) => {
	if (!value) {
		return "Введите имя";
	}

	if (value.length < 2) {
		return "Минимум 2 символа";
	}

	return true;
};

const validateEmail = (value: string) => {
	if (!value) {
		return "Введите email";
	}

	if (!value.includes("@")) {
		return "Email должен содержать @";
	}

	return true;
};

const validatePassword = (value: string) => {
	if (!value) {
		return "Введите пароль";
	}

	if (value.length < 8) {
		return "Минимум 8 символов";
	}

	return true;
};

/**
 * useForm создаёт форму.
 *
 * initialValues — начальные значения полей.
 * validationSchema — правила валидации для каждого поля.
 *
 * defineField создаёт v-model и props для input.
 * errors хранит ошибки.
 * meta хранит состояние формы: dirty, touched, valid.
 * handleSubmit запускает валидацию перед submit.
 * resetForm возвращает форму к начальному состоянию.
 */
const { defineField, errors, meta, values, handleSubmit, resetForm } = useForm<RegisterForm>({
	initialValues: {
		name: "",
		email: "",
		password: "",
	},
	validationSchema: {
		name: validateName,
		email: validateEmail,
		password: validatePassword,
	},
});

const [name, nameProps] = defineField("name");
const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");

const submitResult = ref("Форма ещё не отправлялась");

const formState = computed(() => {
	return `values: ${JSON.stringify(values, null, 2)}
valid: ${meta.value.valid}
dirty: ${meta.value.dirty}
touched: ${meta.value.touched}

submit:
${submitResult.value}`;
});

/**
 * handleSubmit не вызовет callback,
 * пока форма не пройдёт валидацию.
 *
 * Поэтому внутри onSubmit уже можно работать
 * с проверенными values.
 */
const onSubmit = handleSubmit((formValues) => {
	submitResult.value = JSON.stringify(formValues, null, 2);
});
</script>

<template>
	<section class="lesson">
		<h1>VeeValidate: registration form</h1>

		<form class="workspace" @submit="onSubmit">
			<div class="code-block">
				<span>Форма</span>

				<label class="field">
					Имя
					<input v-model="name" v-bind="nameProps" placeholder="John" />
					<small>{{ errors.name }}</small>
				</label>

				<label class="field">
					Email
					<input v-model="email" v-bind="emailProps" placeholder="john@example.com" />
					<small>{{ errors.email }}</small>
				</label>

				<label class="field">
					Пароль
					<input
						v-model="password"
						v-bind="passwordProps"
						type="password"
						placeholder="Минимум 8 символов"
					/>
					<small>{{ errors.password }}</small>
				</label>

				<button type="submit">Зарегистрироваться</button>

				<button type="button" @click="resetForm()">Reset</button>
			</div>

			<div class="code-block code-block--success">
				<span>Состояние формы</span>
				<pre>{{ formState }}</pre>
			</div>
		</form>
	</section>
</template>
