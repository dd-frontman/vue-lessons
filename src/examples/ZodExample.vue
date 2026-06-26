<script setup lang="ts">
import { z } from "zod";

const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	// age: z.coerce.number(),
});

const apiUser = {
	id: 1,
	name: "John",
	// age: "25",
};

// const user = userSchema.parse(apiUser);
const user = userSchema.safeParse(apiUser);
</script>

<template>
	<section class="lesson">
		<h1>Zod: runtime validation для данных с API</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Данные с API</span>
				<pre>{{ apiUser }}</pre>
			</div>

			<div class="code-block code-block--success">
				<span>После Zod</span>
				<pre>{{ user.success ? user.data : user.error }}</pre>
			</div>
		</div>
	</section>
</template>
