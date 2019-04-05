class Tower {
  public:
    Tower(int numIndexes, Indexes* indexes) {
      this-> numberOfIndexes = numIndexes;
      this->indexes = indexes;
    }

    Tower(int numIndexes) {
      this->numberOfIndexes = numIndexes;
      this->indexes = new Indexes(numIndexes);
    }

    Tower(Indexes* indexes) {
      this-> numberOfIndexes = indexes->getNumOfIndexes();
      this->indexes = indexes;
    }

    Tower() {
      this->indexes = new Indexes(6);
      this->numberOfIndexes = 6;
    }

  private:
    int numberOfIndexes;
    Indexes* indexes;
};
