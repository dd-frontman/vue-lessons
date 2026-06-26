declare module "vuex" {
	import type { App, InjectionKey } from "vue";

	type MutationPayload = {
		type: string;
		payload?: unknown;
	};

	type ActionPayload = {
		type: string;
		payload?: unknown;
	};

	type StoreContext<S> = {
		state: S;
		getters: Record<string, unknown>;
		commit: (type: string, payload?: unknown) => void;
		dispatch: (type: string, payload?: unknown) => Promise<unknown>;
	};

	type StoreOptions<S> = {
		state?: S | (() => S);
		getters?: Record<string, (state: S, getters: Record<string, unknown>) => unknown>;
		mutations?: Record<string, (state: S, payload?: any) => void>;
		actions?: Record<string, (context: StoreContext<S>, payload?: any) => unknown>;
	};

	type SubscribeActionOptions<S> = {
		before?: (action: ActionPayload, state: S) => void;
		after?: (action: ActionPayload, state: S) => void;
		error?: (action: ActionPayload, state: S, error: Error) => void;
	};

	export type Store<S> = {
		readonly state: S;
		readonly getters: Record<string, unknown>;
		install: (app: App) => void;
		commit: (type: string, payload?: unknown) => void;
		dispatch: (type: string, payload?: unknown) => Promise<unknown>;
		subscribe: (callback: (mutation: MutationPayload, state: S) => void) => () => void;
		subscribeAction: (options: SubscribeActionOptions<S>) => () => void;
	};

	export function createStore<S>(options: StoreOptions<S>): Store<S>;
	export function useStore<S = any>(injectKey?: InjectionKey<Store<S>> | string): Store<S>;
}
