class Observer {
public:
  virtual void update(const std::string &state) = 0;
};
class Subject {
public:
  virtual void attach(Observer *observer) = 0;
  virtual void detach(Observer *observer) = 0;
  virtual void notify() = 0;
};
class ConcreteSubject : public Subject {
private:
  std::vector<Observer *> observers;
  std::string state;

public:
  void attach(Observer *observer) override { observers.push_back(observer); }
  void detach(Observer *observer) override {
    observers.erase(std::remove(observers.begin(), observers.end(), observer),
                    observers.end());
  }
  void notify() override {
    for (Observer *observer : observers) {
      observer->update(state);
    }
  }
  void setState(const std::string &newState) {
    state = newState;
    notify();
  }
};
class ConcreteObserver : public Observer {
private:
  std::string observerName;

public:
  ConcreteObserver(const std::string &name) : observerName(name) {}
  void update(const std::string &state) override {
    std::cout << observerName << " received update: " << state << std::endl;
  }
};
