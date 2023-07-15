<template>
    <!-- 侧边栏 -->
    <div>
        <el-submenu :index="item.path" v-if="item.children">
            <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                <router-link :to="child.path" :class="{ 'active': isActive(child.path) }">{{ child.name }}</router-link>
            </el-menu-item>
        </el-submenu>

        <router-link :to="item.path" v-else :class="{ 'active': isActive(item.path) }">
            <i :class="item.iconClass"></i>
            <span slot="title">{{ item.name }}</span>
        </router-link>
    </div>
</template>
 
<script>

export default {
    name: 'MenuRouter',
    props: {
        item: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
        }
    },
    methods: {
        isActive(path) {
            return this.$route.path === path;
        }
    }
}

</script>

<style scoped>
/* .active {
    background-color: #373D41;
} */

.router-link-active {
    text-decoration: none;
    color: rgb(236, 137, 9);
}

a {
    text-decoration: none;
    color: white;
}
</style>