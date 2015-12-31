(function (Vue, _) {

    new Vue({
        el: 'body',

        data: function () {
            return {
                isSuccess: false,
                errors: {
                    errors: {},
                    hasErrors: function () {
                        return ! _.isEmpty(this.errors);
                    },
                    has: function (field) {
                        return _.indexOf(_.keys(this.errors), field) > -1;
                    },
                    all: function () {
                        return this.errors;
                    },
                    flatten: function () {
                        return _.flatten(_.toArray(this.errors));
                    },
                    get: function (field) {
                        if (this.has(field)) {
                            return this.errors[field][0];
                        }
                    },
                    set: function (errors) {
                        if (typeof errors === 'object') {
                            this.errors = errors;
                        } else {
                            this.errors = {'field': ['Something went wrong. Please try again.']};
                        }
                    },
                    forget: function () {
                        this.errors = {};
                    },
                },
                form: {
                    email: '',
                    name: '',
                    degree: '',
                    validate: {
                        'email':'required|email',
                        'name':'required',
                        'degree':'required'
                    },
                }
            };
        },

        methods: {
            handle: function (event) {
                var self = this;
                event.preventDefault();
                this.isSuccess = false;
                this.errors.forget();
                this.$http.post('http://localhost:8000/api/properties/c9c3c508-a9e5-428d-9099-6bff7f1e147d/snapshots', this.form)
                    .then(function (response) {
                        self.isSuccess = true;
                    }, function(err) {
                        if (err.status == 422) {
                            self.errors.set(err.data);
                        } else {
                            console.log(err);
                        }
                    });
            }
        },

    })

})(Vue, _)
