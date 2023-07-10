<template>
    <div class="grid grid-cols-2 gap-10">
        <div class="w-12 h-12 rounded-full flex items-center justify-center border" :class="{'border-primary border-4': currentState == state}" v-for="state in states">
            {{ state }}
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        states : Array,
        currentState : String
    })


</script>

<style scoped>

</style>