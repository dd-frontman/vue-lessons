import { createStore } from "vuex";

type User = {
	id: number;
	name: string;
	email: string;
};

export type VuexAuthState = {
	user: User | null;
	loginCount: number;
};

const createInitialState = (): VuexAuthState => ({
	user: null,
	loginCount: 0,
});

/**
 * Vuex — это предыдущий официальный state manager для Vue.
 *
 * Он решает ту же задачу, что и Pinia:
 * хранить общее состояние приложения в одном месте.
 *
 * Но Vuex более многословный:
 * state хранит данные,
 * getters считают производные значения,
 * mutations синхронно меняют state,
 * actions вызывают mutations и содержат бизнес-логику.
 *
 * В Pinia mutations убрали.
 * Там actions могут менять state напрямую.
 */
export const vuexAuthStore = createStore<VuexAuthState>({
	/**
	 * state — данные store.
	 *
	 * Аналог state в Pinia.
	 * Здесь храним пользователя и счётчик логинов.
	 */
	state: createInitialState,

	/**
	 * getters — computed-значения для store.
	 *
	 * Аналог getters в Pinia.
	 * Отличие: в Vuex getters часто достают через строковые ключи:
	 * store.getters.isLoggedIn
	 */
	getters: {
		isLoggedIn: (state) => Boolean(state.user),
		userName: (state) => state.user?.name ?? "Гость",
	},

	/**
	 * mutations — синхронные изменения state.
	 *
	 * Это главное отличие Vuex от Pinia.
	 *
	 * Во Vuex принято не менять state напрямую из actions.
	 * Вместо этого action вызывает commit("mutationName").
	 *
	 * Минус: появляется больше кода и строковых ключей.
	 */
	mutations: {
		setUser(state, user: User) {
			state.user = user;
		},

		clearUser(state) {
			state.user = null;
		},

		incrementLoginCount(state) {
			state.loginCount += 1;
		},

		renameUser(state, name: string) {
			if (!state.user) {
				return;
			}

			state.user.name = name;
		},

		patchEmail(state, email: string) {
			if (!state.user) {
				return;
			}

			state.user.email = email;
		},

		resetState(state) {
			Object.assign(state, createInitialState());
		},
	},

	/**
	 * actions — методы store.
	 *
	 * В actions обычно кладут async-логику:
	 * запрос к API, login, logout, загрузку профиля.
	 *
	 * Во Vuex action меняет state через commit().
	 * В Pinia action может писать this.user = ... напрямую.
	 */
	actions: {
		login({ commit }) {
			commit("setUser", {
				id: 1,
				name: "John",
				email: "john@example.com",
			});

			commit("incrementLoginCount");
		},

		logout({ commit }) {
			commit("clearUser");
		},

		renameUser({ commit }, name: string) {
			commit("renameUser", name);
		},

		patchEmail({ commit }) {
			commit("patchEmail", "patched@example.com");
		},

		reset({ commit }) {
			commit("resetState");
		},
	},
});
