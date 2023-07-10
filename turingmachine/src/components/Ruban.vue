<template>
    <div class="flex">
        
        <div v-for="(value,index) in ruban" class="border p-2 w-12 h-12 flex items-center justify-center relative">
            <div class="absolute border border-primary w-[60px] h-[60px]" v-if="index == currentPosition">
            </div>
            {{ value == 'b' ? ' ' : value }}
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        ruban: Array,
        currentPosition : Number
    })

</script>

<style scoped>

</style>