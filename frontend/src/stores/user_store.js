import { defineStore } from 'pinia';
import { login, register, verify } from '@/api/user_api';

export const useUserStore = defineStore('user', {
  state: () => ({
    is_ready: false,
    username: null
  }),
  //Needs more documentation.
  actions: {
    async verify() {
      try {
        const response = await verify();
        this.username = response.data.data.username;
        this.is_ready = true;
        return {
          success: true,
          data: {
            code: 'VERIFY_SUCCESS',
            username: this.username
          }
        };
      } catch (error) {
        //Could be no token or invalid token
        //Could be connection error
      }
    }
  }
});