<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";
import { useAuthStore } from "./authStore";

/**
 * Pinia решает задачу общего состояния.
 *
 * Без store данные пользователя пришлось бы прокидывать через props
 * или дублировать в нескольких компонентах.
 *
 * Здесь authStore можно использовать в любом компоненте,
 * и все они увидят одно и то же состояние user.
 */
const authStore = useAuthStore();

/**
 * $state — это весь state store одним объектом.
 *
 * Обычно в компонентах чаще обращаются к конкретным полям:
 * authStore.user, authStore.loginCount.
 *
 * Но $state полезно показать на уроке,
 * чтобы увидеть, что именно хранится внутри store.
 */

/**
 * storeToRefs нужен, когда мы хотим достать поля из store.
 *
 * Если сделать обычный destructuring:
 * const { user } = authStore
 *
 * можно потерять реактивность.
 *
 * storeToRefs сохраняет реактивность для state и getters.
 * Actions через storeToRefs не достают, их вызывают напрямую из authStore.
 */
const { user, isLoggedIn, userName, loginCount } = storeToRefs(authStore);

/**
 * $patch — метод Pinia для изменения state.
 *
 * Он удобен, когда нужно поменять несколько полей сразу
 * или сгруппировать изменение state в одном месте.
 */
const patchEmail = () => {
	authStore.$patch((state) => {
		if (!state.user) {
			return;
		}

		state.user.email = "patched@example.com";
	});
};

/**
 * $reset — метод Pinia для возврата state к начальному значению.
 *
 * В этом примере он вернёт:
 * user: null
 * loginCount: 0
 */
const resetStore = () => {
	authStore.$reset();
};

/**
 * $subscribe позволяет подписаться на любое изменение store.
 *
 * Это полезно для логирования, аналитики или ручного сохранения state.
 * В примере мы просто выводим изменение в консоль.
 */
const unsubscribe = authStore.$subscribe((mutation, state) => {
	console.log("auth store changed", mutation.type, state);
});

/**
 * $onAction позволяет подписаться на вызовы actions.
 *
 * $subscribe реагирует на изменение state.
 * $onAction реагирует именно на запуск actions:
 * login(), logout(), renameUser().
 *
 * Это полезно для логирования, аналитики,
 * замера времени выполнения или обработки ошибок actions.
 */
const unsubscribeActions = authStore.$onAction(({ name, after, onError }) => {
	console.log("auth action started", name);

	after(() => {
		console.log("auth action finished", name);
	});

	onError((error) => {
		console.error("auth action failed", name, error);
	});
});

onUnmounted(() => {
	unsubscribe();
	unsubscribeActions();
});
</script>

<template>
	<section class="lesson">
		<h1>Pinia: auth store</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Действия</span>

				<button type="button" @click="authStore.login">Login</button>

				<button type="button" @click="authStore.logout">Logout</button>

				<button type="button" :disabled="!isLoggedIn" @click="authStore.renameUser('Jane')">
					Rename action
				</button>

				<button type="button" :disabled="!isLoggedIn" @click="patchEmail">$patch email</button>

				<button type="button" @click="resetStore">$reset</button>
			</div>

			<div class="code-block code-block--success">
				<span>Store</span>
				<pre>
$state: {{ authStore.$state }}
user: {{ user }}
isLoggedIn: {{ isLoggedIn }}
loginCount: {{ loginCount }}</pre
				>
			</div>
		</div>

		<div class="workspace workspace--example">
			<div class="code-block">
				<span>Шапка сайта</span>
				<pre>Привет, {{ userName }}</pre>
			</div>

			<div class="code-block">
				<span>Профиль</span>
				<pre v-if="user">
id: {{ user.id }}
email: {{ user.email }}</pre
				>
				<pre v-else>Пользователь не авторизован</pre>
			</div>
		</div>
	</section>
</template>
