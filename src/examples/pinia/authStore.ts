import { defineStore } from "pinia";

type User = {
	id: number;
	name: string;
	email: string;
};

type AuthState = {
	user: User | null;
	loginCount: number;
};

/**
 * Важно: Pinia не делает то, что невозможно написать на обычном Vue API.
 *
 * state можно заменить на ref/reactive.
 * getters можно заменить на computed.
 * actions можно заменить на обычные функции.
 *
 * Например, мини-store можно собрать руками:
 * const user = ref(null)
 * const isLoggedIn = computed(() => Boolean(user.value))
 * const login = () => { user.value = ... }
 *
 * Но Pinia даёт готовый стандарт для проекта:
 * defineStore, state/getters/actions, DevTools,
 * $patch, $reset, $subscribe, $onAction,
 * удобную типизацию и плагины.
 *
 * Поэтому для маленького примера Vue API достаточно,
 * а для общего состояния приложения Pinia обычно понятнее и удобнее.
 */

/**
 * defineStore создаёт store.
 *
 * Первый аргумент — уникальное имя store.
 * По нему Pinia отличает один store от другого.
 *
 * Второй аргумент — описание store:
 * state, getters и actions.
 */
export const useAuthStore = defineStore("auth", {
	/**
	 * state — это данные store.
	 *
	 * Это похоже на ref/reactive внутри компонента,
	 * но state живёт отдельно от компонента.
	 *
	 * Поэтому user можно читать из разных мест приложения:
	 * в шапке, профиле, настройках, guards и других компонентах.
	 */
	state: (): AuthState => ({
		user: null,
		loginCount: 0,
	}),

	/**
	 * getters — это computed для store.
	 *
	 * Они нужны, когда значение можно получить из state,
	 * а не хранить отдельно.
	 */
	getters: {
		isLoggedIn: (state) => Boolean(state.user),
		userName: (state) => state.user?.name ?? "Гость",
	},

	/**
	 * actions — это методы store.
	 *
	 * В actions обычно кладут бизнес-логику:
	 * login, logout, загрузку данных, сохранение, обновление профиля.
	 *
	 * Внутри actions можно менять state через this.
	 */
	actions: {
		login() {
			this.user = {
				id: 1,
				name: "John",
				email: "john@example.com",
			};

			this.loginCount += 1;
		},

		logout() {
			this.user = null;
		},

		renameUser(name: string) {
			if (!this.user) {
				return;
			}

			this.user.name = name;
		},
	},
});
