class jsObj {
  public:
    jsObj(String* keys, int* values, int len) {
      this->keys = keys;
      this->numvalues = values;
      this->objSize = len;
      this->objType = "num";
    }

    jsObj(String* keys, bool* values, int len) {
      this->keys = keys;
      this->boolvalues = values;
      this->objSize = len;
      this->objType = "bool";
    }

    jsObj(String* keys, String* values, int len) {
      this->keys = keys;
      this->strvalues = values;
      this->objSize = len;
      this->objType = "str";
    }

    

  // Values
  // NUMVALS
    int getIndexInArr(int* arr, int element) {
      for (int i = 0; i < this->objSize; i++) {
        if (arr[i] == element) {
          return i;
        }
      }
    }

    int getNumValue(String key) {
      return this->numvalues[this->getIndexInArr(this->keys, key)];
    }

    int getValueIndex(int val) {
      return this->getIndexInArr(this->numvalues, val);
    }

    void setValue(String key, int val) {
      this->numvalues[this->getIndexInArr(this->keys, key)] = val;
    }

    void setValue(int index, int val) {
      this->numvalues[index] = val;
    }


  // BOOLVALS
    int getIndexInArr(bool* arr, bool element) {
      for (int i = 0; i < this->objSize; i++) {
        if (arr[i] == element) {
          return i;
        }
      }
    }

    bool getBoolValue(String key) {
      return this->boolvalues[this->getIndexInArr(this->keys, key)];
    }

    int getValueIndex(bool val) {
      return this->getIndexInArr(this->boolvalues, val);
    }

    void setValue(String key, bool val) {
      this->boolvalues[this->getIndexInArr(this->keys, key)] = val;
    }

    void setValue(int index, bool val) {
      this->boolvalues[index] = val;
    }



  // STRVALS
    int getIndexInArr(String* arr, String element) {
      for (int i = 0; i < this->objSize; i++) {
        if (arr[i] == element) {
          return i;
        }
      }
    }

    String getStrValue(String key) {
      return this->strvalues[this->getIndexInArr(this->keys, key)];
    }

    int getValueIndex(String val) {
      return this->getIndexInArr(this->strvalues, val);
    }

    void setValue(String key, String val) {
      this->strvalues[this->getIndexInArr(this->keys, key)] = val;
    }

    void setValue(int index, String val) {
      this->strvalues[index] = val;
    }


  // Keys
    String getKeyOf(int val) {
      return this->keys[this->getIndexInArr(this->numvalues, val)];
    }

    String getKeyOf(bool val) {
      return this->keys[this->getIndexInArr(this->boolvalues, val)];
    }

    String getKeyOf(String val) {
      return this->keys[this->getIndexInArr(this->strvalues, val)];
    }

    void setKey(String val, String key){
      this->keys[this->getIndexInArr(this->strvalues, val)] = key;
    }

    void setKey(int valIndex, String key, bool isIndex){
      if (!isIndex){
        this->keys[this->getIndexInArr(this->numvalues, valIndex)] = key;
      }
      else {
        this->keys[valIndex] = key;
      }
    }

    void setKey(bool val, String key){
      this->keys[this->getIndexInArr(this->boolvalues, val)] = key;
    }

    int getKeyIndex(String key) {
      return this->getIndexInArr(this->keys, key);
    }

  private:
    String* keys;
    int objSize;
    int* numvalues;
    bool* boolvalues;
    String* strvalues;

    String objType;
};


// INDEXES------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class Indexes {
  public:
    Indexes(int indexes) {
      this->indexes = indexes;

      String ownerNames[indexes];      
      bool isOccupied[indexes];
      String passkeys[indexes];

      for (int i = 0; i < indexes; i++){
        ownerNames[i] = "";
        isOccupied[i] = false;
        passkeys[i] = "";
      }

      this->passkeys = passkeys;
      this->info = new jsObj(ownerNames, isOccupied, indexes);
    }

    Indexes(int indexes, bool* isOccupied) {
      String ownerNames[indexes];
      String passkeys[indexes]; 

      for (int i = 0; i < indexes; i++){
        ownerNames[i] = "";
        passkeys[i] = "";
      }

      this->passkeys = passkeys;
      this->indexes = indexes;
      this->info = new jsObj(ownerNames, isOccupied, indexes);
    }

    Indexes(int indexes, bool* isOccupied, String* passkeys) {
      String ownerNames[indexes];

      for (int i = 0; i < indexes; i++){
        ownerNames[i] = "";
      }

      this->passkeys = passkeys;
      this->indexes = indexes;
      this->info = new jsObj(ownerNames, isOccupied, indexes);
    }

    Indexes(int indexes, String* ownerNames) {
      bool isOccupied[indexes];    

      for (int i = 0; i < indexes; i++){
        isOccupied[i] = false;
      }
      
      this->indexes = indexes;
      this->info = new jsObj(ownerNames, isOccupied, indexes);
    }

    Indexes(int indexes, String* ownerNames, bool* isOccupied) {
      this->indexes = indexes;
      this->info = new jsObj(ownerNames, isOccupied, indexes);
    }
    
    Indexes(int indexes, String* ownerNames, bool* isOccupied, String* passkeys) {
      this->indexes = indexes;
      this->passkeys = passkeys;
      this->info = new jsObj(ownerNames, isOccupied, indexes);
    }

    int getNumOfIndexes() {
      return this->indexes;
    }

    int getCurrentParkIndex() {
      return this->currentParkIndex;
    }

    int incrementParkIndex(){
      return ++this->currentParkIndex;
    }

    String occupy(int index, String ownerName, String passkey){
      this->info->setKey(index, ownerName);
      this->info->setValue(index, true);
      this->passkeys[this->info->getKeyIndex(ownerName)] = passkey;
      return "success";
    }

    String unoccupy(int index, String passkey){
      if (this->passkeys[index] == passkey){
        this->info->setKey(index, "", true);
        this->info->setValue(index, false);
        return "success"; 
      }
      
      else {
        return "wpk"; // wpk = wrong pass key
      }
    }

    String unoccupy(String ownerName, String passkey){
      if (this->passkeys[this->info->getKeyIndex(ownerName)] == passkey){
        this->info->setValue(ownerName, false);
        this->info->setKey(this->info->getKeyIndex(ownerName), "");
        return "success";        
      }

      else {
        return "wpk"; // wpk = wrong pass key
      }

    }

  private:
    int indexes;
    int currentParkIndex = 0;
    String* passkeys;
    jsObj* info;

};
