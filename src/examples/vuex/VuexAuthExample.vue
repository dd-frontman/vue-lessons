<script setup lang="ts">
import { computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import type { VuexAuthState } from "./authStore";

/**
 * useStore() достаёт Vuex store, который подключили в main.ts.
 *
 * В Pinia мы вызываем конкретный composable:
 * const authStore = useAuthStore()
 *
 * Во Vuex чаще работаем с одним store:
 * store.state
 * store.getters
 * store.commit()
 * store.dispatch()
 */
const store = useStore<VuexAuthState>();

/**
 * State во Vuex читается через store.state.
 *
 * Чтобы удобно использовать его в template,
 * оборачиваем нужные поля в computed.
 */
const user = computed(() => store.state.user);
const loginCount = computed(() => store.state.loginCount);

/**
 * Getters во Vuex доступны через store.getters.
 *
 * Минус по сравнению с Pinia:
 * getters хуже типизируются и часто обращение идёт через строковые ключи.
 */
const isLoggedIn = computed(() => store.getters.isLoggedIn as boolean);
const userName = computed(() => store.getters.userName as string);

/**
 * Actions запускаются через dispatch().
 *
 * dispatch("login") вызывает action login.
 * А уже action внутри вызывает commit("setUser").
 *
 * В Pinia было короче:
 * authStore.login()
 */
const login = () => {
	void store.dispatch("login");
};

const logout = () => {
	void store.dispatch("logout");
};

const renameUser = () => {
	void store.dispatch("renameUser", "Jane");
};

const patchEmail = () => {
	void store.dispatch("patchEmail");
};

const resetStore = () => {
	void store.dispatch("reset");
};

/**
 * subscribe — аналог Pinia $subscribe.
 *
 * Он реагирует на mutations:
 * setUser, clearUser, renameUser и другие.
 */
const unsubscribe = store.subscribe((mutation, state) => {
	console.log("vuex mutation", mutation.type, state);
});

/**
 * subscribeAction — аналог Pinia $onAction.
 *
 * Он реагирует на actions:
 * login, logout, renameUser.
 */
const unsubscribeActions = store.subscribeAction({
	before: (action) => {
		console.log("vuex action started", action.type);
	},
	after: (action) => {
		console.log("vuex action finished", action.type);
	},
	error: (action, _state, error) => {
		console.error("vuex action failed", action.type, error);
	},
});

onUnmounted(() => {
	unsubscribe();
	unsubscribeActions();
});
</script>

<template>
	<section class="lesson">
		<h1>Vuex: auth store</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Действия</span>

				<button type="button" @click="login">Login</button>

				<button type="button" @click="logout">Logout</button>

				<button type="button" :disabled="!isLoggedIn" @click="renameUser">Rename action</button>

				<button type="button" :disabled="!isLoggedIn" @click="patchEmail">commit email</button>

				<button type="button" @click="resetStore">reset mutation</button>
			</div>

			<div class="code-block code-block--success">
				<span>Store</span>
				<pre>
state: {{ store.state }}
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

		<div class="code-block code-block--example">
			<span>Чем Vuex хуже Pinia в новых проектах</span>
			<pre>
Больше boilerplate: actions + mutations
Больше строковых ключей: dispatch("login"), commit("setUser")
Слабее TypeScript DX для getters/actions
Модули во Vuex более многословные
В Pinia actions меняют state напрямую</pre
			>
		</div>
	</section>
</template>
