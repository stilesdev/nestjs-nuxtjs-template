<template>
    <Tutorial :api-text="apiText"></Tutorial>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Context } from '@nuxt/types'

@Component({
    async asyncData({ $axios }: Context) {
        let apiText
        try {
            apiText = await $axios.$get('/')
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
        }

        return {
            apiText,
        }
    },
})
export default class extends Vue {
    apiText?: string
}
</script>
