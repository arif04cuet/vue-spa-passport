<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Welcome <strong>{{ currentUser.name }}</strong>
      </h3>

      <br />
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>

      <form name="form" @submit.prevent="handleProfileUpdate">
        <div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="user.name"
              v-validate="'required|min:3'"
              type="text"
              class="form-control"
              name="name"
            />
            <div v-if="submitted && errors.has('name')" class="alert-danger">
              {{ errors.first('name') }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first('email') }}
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
    </header>
  </div>
</template>

<script>
import User from '../models/user';
export default {
  name: 'Profile',
  data() {
    return {
      user: new User('', ''),
      submitted: false,
      successful: false,
      message: '',
    };
  },

  computed: {
    currentUser() {
      if (!this.$store.state.auth.user) return null;

      return this.$store.state.auth.user.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.user = new User(this.currentUser.name, this.currentUser.email);
  },

  methods: {
    handleProfileUpdate() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch('auth/userUpdate', this.user).then(
            (data) => {
              ///console.log(data);
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.$setLaravelValidationErrorsFromResponse(error.response.data);
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>