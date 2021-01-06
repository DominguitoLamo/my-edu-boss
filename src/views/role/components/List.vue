<template>
    <div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getRoles, deleteRole } from '@/services/role';
import { Form } from 'element-ui';
import CreateOrEdit from './CreateOrEdit.vue';

export default Vue.extend({
    name: 'RoleList',
    components: {
        CreateOrEdit,
    },
    data() {
        return {
        roles: [], // 角色列表
        form: {
            current: 1,
            size: 50,
            name: '',
        }, // 查询条件
        loading: false,
        dialogVisible: false, // 控制添加/编辑角色的对话框显示和隐藏
        roleId: null, // 编辑角色的 ID
        isEdit: false,
        };
    },
    created() {
        this.loadRoles();
    },
    methods: {
        async loadRoles() {
            this.loading = true;
            const { data } = await getRoles(this.form);
            this.roles = data.data.records;
            this.loading = false;
        },

        onSubmit() {
            this.loadRoles();
        },

        handleEdit(role: any) {
            this.dialogVisible = true;
            this.roleId = role.id;
            this.isEdit = true;
        },

        async handleDelete(role: any) {
            try {
                await this.$confirm(`确认删除角色：${role.name}？`, '删除提示');
                await deleteRole(role.id);
                this.$message.success('删除成功');
                this.loadRoles();
            } catch (err) {
                if (err && err.response) {
                this.$message.error('删除失败，请重试');
                } else {
                this.$message.info('取消删除');
                }
            }
        },

        onReset() {
            (this.$refs.form as Form).resetFields();
            this.loadRoles();
        },

        onSuccess() {
            this.dialogVisible = false; // 关闭对话框
            this.loadRoles(); // 重新加载数据列表
        },

        handleAdd() {
            this.isEdit = false;
            this.dialogVisible = true;
        },
    },
});
</script>

<style scoped>

</style>