<template>
    <div>
        <el-submenu :key="item.path" :index="item.path" v-if="item.children">
            <template slot="title">
                <i :class="item.iconClass"></i>
                <span>{{ item.name }}</span>
            </template>
            <MenuRouter v-for="child in item.children" :key="child.path" :item="child">
            </MenuRouter>
        </el-submenu>

        <el-menu-item :index="item.path" v-else>
            <i :class="item.iconClass"></i>
            <span slot="title">{{ item.name }}</span>
        </el-menu-item>
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
}

</script>