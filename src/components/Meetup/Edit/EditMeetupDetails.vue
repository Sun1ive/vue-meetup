<template>
  <v-dialog max-width="350px" persistent v-model="editDialog">
    <v-btn fab slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex>
            <v-card-text>
              <v-text-field v-model="editedTitle" name="Title" label="Title" id="title"></v-text-field>
              <v-text-field v-model="editedDesc" name="desc" label="desc" id="desc" multi-line></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">save</v-btn>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">close</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedDesc: this.meetup.desc,
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedTitle.trim() === '' || this.editedDesc.trim() === '') {
        return;
      }
      this.editDialog = false;
    },
  },
};
</script>

<style scoped lang="stylus">
</style>