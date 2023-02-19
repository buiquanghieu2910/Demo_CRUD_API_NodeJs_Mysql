'use strict'

exports.store = function (req, res) {
    var birthday = new Date('2002-10-29')
    res.json({
        full_name: 'Bùi Quang Hiếu',
        birthday: birthday,
        age: (new Date().getFullYear() - birthday.getFullYear()),
        company: 'Luvina'
    })
}