////////////////////////////////////////

class RefManager {

    _defaultRef = null;
    _RefCollection = [];

    register(_ref, name, defaultsetting) {
        _ref._id = name;
        let find = this._RefCollection.findIndex(t => {
            return t._id === name;
        })
        if (find > -1) {
            console.log('Exist REF NAMe :: ', name);
        } else {
            if (this._defaultRef == null) {
                this._defaultRef = _ref;
            } else {
                if (defaultsetting) {
                    this._defaultRef = _ref;
                }
            }
            this._RefCollection.push(_ref);
        }
    }

    unregister(_ref) {
        if (!!this._defaultRef && this._defaultRef._id === _ref._id) {
            this._defaultRef = null;
        }
        let find = this._RefCollection.findIndex(t => {
            return t._id === _ref._id;
        })
        if (find > -1) {
            this._RefCollection.splice(find, 1);
        }
    }

    getDefault() {
        console.log('GET DEFAULT REF : ', this._defaultRef);
        return this._defaultRef;
    }

    getRegisterRef(id) {
        return this._RefCollection.find(t => {
            return t._id === id;
        });
    }
}

////////////////////////////////////////

export default new RefManager();
