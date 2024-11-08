class TallyStore {
    constructor() {
        this.state = { count: 0 };
        this.listeners = [];
    }

    // Returns the current state
    getState() {
        return this.state;
    }

    // Dispatches actions to update the state
    dispatch(action) {
        switch (action.type) {
            case 'ADD':
                this.state.count += 1;
                break;
            case 'SUBTRACT':
                this.state.count -= 1;
                break;
            case 'RESET':
                this.state.count = 0;
                break;
            default:
                return;
        }
        this.notifySubscribers();
    }

    // Subscribes to state changes
    subscribe(listener) {
        this.listeners.push(listener);
    }

    // Notifies all subscribers of state changes
    notifySubscribers() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Example usage:
const tallyStore = new TallyStore();

// Subscribe to log state changes
tallyStore.subscribe((newState) => {
    console.log('New State:', newState);
});

// Initial State Verification
console.log('Initial State:', tallyStore.getState()); // Should log { count: 0 }

// Incrementing the Counter
tallyStore.dispatch({ type: 'ADD' });
tallyStore.dispatch({ type: 'ADD' }); // Should log { count: 2 }

// Decrementing the Counter
tallyStore.dispatch({ type: 'SUBTRACT' }); // Should log { count: 1 }

// Resetting the Counter
tallyStore.dispatch({ type: 'RESET' }); // Should log { count: 0 }