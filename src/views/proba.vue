<v-col sm="2" style="margin-left: 80px; margin-top: -10px">
            <h6>Po vrstama turizma ova destinacija je:</h6>
            <v-list v-for="(vrste, index) in vrstadestinacije" :key="index">
              <v-list-item
                style="margin-top: -20px"
                v-for="(vrste2, index2) in vrste"
                :key="index2"
                >{{ vrste2 }}</v-list-item
              >
            </v-list>
          </v-col>