var config = require(__dirname+'/../config.js');

var thinky = require(__dirname+'/../lib/thinky.js')(config);
var r = thinky.r;

var util = require(__dirname+'/util.js');
var assert = require('assert');
var Promise = require('bluebird');

describe('Advanced cases', function(){
    it('hasOne - belongsTo', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasOne(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDoc = new OtherModel(otherValues);

        doc.has = otherDoc;

        doc.saveAll().then(function(result) {
            assert.equal(typeof result.id, 'string')
            assert.equal(typeof result.has.id, 'string')
            assert.equal(result.id, result.has.otherId)

            assert.strictEqual(result, doc);
            assert.strictEqual(result.has, doc.has);
            assert.strictEqual(doc.has, otherDoc);

            Model.get(doc.id).getJoin().run().then(function(result) {
                assert.equal(result.id, doc.id)
                assert.equal(result.has.id, doc.has.id)
                assert.equal(result.has.otherId, doc.has.otherId)
                OtherModel.get(otherDoc.id).getJoin().run().then(function(result) {
                    assert.equal(result.id, otherDoc.id);
                    assert.equal(result.belongsTo.id, doc.id);
                    done()
                })
            });
        }).error(done);
    });
    it('hasOne - belongsTo', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasOne(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDoc = new OtherModel(otherValues);

        doc.has = otherDoc;
        otherDoc.belongsTo = doc;

        doc.saveAll().then(function(result) {
            assert.equal(typeof result.id, 'string')
            assert.equal(typeof result.has.id, 'string')
            assert.equal(result.id, result.has.otherId)

            assert.strictEqual(result, doc);
            assert.strictEqual(result.has, doc.has);
            assert.strictEqual(doc.has, otherDoc);

            Model.get(doc.id).getJoin().run().then(function(result) {
                assert.equal(result.id, doc.id)
                assert.equal(result.has.id, doc.has.id)
                assert.equal(result.has.otherId, doc.has.otherId)
                OtherModel.get(otherDoc.id).getJoin().run().then(function(result) {
                    assert.equal(result.id, otherDoc.id);
                    assert.equal(result.belongsTo.id, doc.id);
                    done()
                })
            });
        }).error(done);
    });
    it('belongsTo - hasOne', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasOne(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDoc = new OtherModel(otherValues);

        otherDoc.belongsTo = doc;

        otherDoc.saveAll().then(function(result) {
            assert.equal(typeof result.id, 'string')
            assert.equal(typeof result.belongsTo.id, 'string')
            assert.equal(result.otherId, result.belongsTo.id)

            assert.strictEqual(result, otherDoc);
            assert.strictEqual(result.belongsTo, otherDoc.belongsTo);
            assert.strictEqual(otherDoc.belongsTo, doc);

            Model.get(doc.id).getJoin().run().then(function(result) {
                assert.equal(result.id, doc.id)
                assert.equal(result.has.id, otherDoc.id)
                assert.equal(result.has.otherId, otherDoc.otherId)
                OtherModel.get(otherDoc.id).getJoin().run().then(function(result) {
                    assert.equal(result.id, otherDoc.id);
                    assert.equal(result.belongsTo.id, doc.id);
                    done()
                })
            });
        }).error(done);
    });
    it('belongsTo - hasOne -- circular references', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasOne(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDoc = new OtherModel(otherValues);

        otherDoc.belongsTo = doc;
        doc.has = otherDoc;

        otherDoc.saveAll().then(function(result) {
            assert.equal(typeof result.id, 'string')
            assert.equal(typeof result.belongsTo.id, 'string')
            assert.equal(result.otherId, result.belongsTo.id)

            assert.strictEqual(result, otherDoc);
            assert.strictEqual(result.belongsTo, otherDoc.belongsTo);
            assert.strictEqual(otherDoc.belongsTo, doc);

            Model.get(doc.id).getJoin().run().then(function(result) {
                assert.equal(result.id, doc.id)
                assert.equal(result.has.id, otherDoc.id)
                assert.equal(result.has.otherId, otherDoc.otherId)
                OtherModel.get(otherDoc.id).getJoin().run().then(function(result) {
                    assert.equal(result.id, otherDoc.id);
                    assert.equal(result.belongsTo.id, doc.id);
                    done()
                })
            });
        }).error(done);
    });
    it('hasMany - belongsTo', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasMany(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDocs = [new OtherModel(otherValues), new OtherModel(otherValues), new OtherModel(otherValues)];

        doc.has = otherDocs;

        doc.saveAll().then(function(result) {
            assert.equal(typeof result.id, 'string');
            assert.equal(result.has.length, 3);
            for(var i=0; i<result.has.length; i++) {
                assert.equal(typeof result.has[i].id, 'string')
                assert.equal(result.has[i].otherId, result.id)
            }

            assert.strictEqual(result, doc);
            for(var i=0; i<result.has.length; i++) {
                assert.strictEqual(result.has[i], doc.has[i]);
            }
            assert.strictEqual(doc.has, otherDocs);

            util.sortById(otherDocs);
            Model.get(doc.id).getJoin({has: { order: "id"}}).run().then(function(result) {
                assert.equal(result.id, doc.id);
                assert.equal(result.has[0].id, doc.has[0].id);
                assert.equal(result.has[1].id, doc.has[1].id);
                assert.equal(result.has[2].id, doc.has[2].id);

                assert.equal(result.has[0].otherId, result.id);
                assert.equal(result.has[1].otherId, result.id);
                assert.equal(result.has[2].otherId, result.id);

                OtherModel.getAll(doc.id, {index: "otherId"}).getJoin().run().then(function(result) {
                    assert.equal(result.length, 3);
                    done()
                })
            });
        }).error(done);
    });
    it('hasMany - belongsTo', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasMany(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDocs = [new OtherModel(otherValues), new OtherModel(otherValues), new OtherModel(otherValues)];

        doc.has = otherDocs;
        otherDocs[0].belongsTo = doc;
        otherDocs[1].belongsTo = doc;
        otherDocs[2].belongsTo = doc;

        doc.saveAll().then(function(result) {
            assert.equal(typeof result.id, 'string');
            assert.equal(result.has.length, 3);
            for(var i=0; i<result.has.length; i++) {
                assert.equal(typeof result.has[i].id, 'string')
                assert.equal(result.has[i].otherId, result.id)
            }

            assert.strictEqual(result, doc);
            for(var i=0; i<result.has.length; i++) {
                assert.strictEqual(result.has[i], doc.has[i]);
            }
            assert.strictEqual(doc.has, otherDocs);

            util.sortById(otherDocs);
            Model.get(doc.id).getJoin({has: { order: "id"}}).run().then(function(result) {
                assert.equal(result.id, doc.id);
                assert.equal(result.has[0].id, doc.has[0].id);
                assert.equal(result.has[1].id, doc.has[1].id);
                assert.equal(result.has[2].id, doc.has[2].id);

                assert.equal(result.has[0].otherId, result.id);
                assert.equal(result.has[1].otherId, result.id);
                assert.equal(result.has[2].otherId, result.id);

                OtherModel.getAll(doc.id, {index: "otherId"}).getJoin().run().then(function(result) {
                    assert.equal(result.length, 3);
                    done()
                })
            });
        }).error(done);
    });
    it('belongsTo - hasMany -- circular references', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String,
            otherId: String
        });

        Model.hasMany(OtherModel, "has", "id", "otherId");
        OtherModel.belongsTo(Model, "belongsTo", "otherId", "id");

        var values = {};
        var otherValues = {};
        var doc = new Model(values);
        var otherDocs = [new OtherModel(otherValues), new OtherModel(otherValues), new OtherModel(otherValues)];

        doc.has = otherDocs;
        otherDocs[0].belongsTo = doc;
        otherDocs[1].belongsTo = doc;
        otherDocs[2].belongsTo = doc;

        otherDocs[0].saveAll().then(function(result) {
            assert.equal(typeof otherDocs[0].id, 'string');
            assert.equal(otherDocs[0].belongsTo.id, doc.id);

            otherDocs[1].saveAll().then(function(result) {
                assert.equal(typeof otherDocs[1].id, 'string');
                assert.equal(otherDocs[1].belongsTo.id, doc.id);

                otherDocs[2].saveAll().then(function(result) {
                    assert.equal(typeof otherDocs[2].id, 'string');
                    assert.equal(otherDocs[2].belongsTo.id, doc.id);

                    util.sortById(otherDocs);
                    Model.get(doc.id).getJoin({has: { order: "id"}}).run().then(function(result) {
                        assert.equal(result.id, doc.id);
                        assert.equal(result.has[0].id, doc.has[0].id);
                        assert.equal(result.has[1].id, doc.has[1].id);
                        assert.equal(result.has[2].id, doc.has[2].id);

                        assert.equal(result.has[0].otherId, result.id);
                        assert.equal(result.has[1].otherId, result.id);
                        assert.equal(result.has[2].otherId, result.id);

                        OtherModel.getAll(doc.id, {index: "otherId"}).getJoin().run().then(function(result) {
                            assert.equal(result.length, 3);
                            done()
                        })
                    });
                });
            });
        }).error(done);
    });
    it('hasAndBelongsToMany -- primary keys', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String
        });

        Model.hasAndBelongsToMany(OtherModel, "links", "id", "id");
        OtherModel.hasAndBelongsToMany(Model, "links", "id", "id");

        var values = {};
        var otherValues = {};
        var doc1 = new Model({});
        var doc2 = new Model({});
        var otherDoc1 = new OtherModel({});
        var otherDoc2 = new OtherModel({});
        var otherDoc3 = new OtherModel({});
        var otherDoc4 = new OtherModel({});

        doc1.links = [otherDoc1, otherDoc2, otherDoc4]
        doc2.links = [otherDoc2, otherDoc3, otherDoc4]

        doc1.saveAll().then(function(result) {
            util.sortById(doc1.links);
            doc2.saveAll().then(function(result) {
                util.sortById(doc2.links);
                Model.get(doc1.id).getJoin({links: { order: "id"}}).run().then(function(result) {
                    assert.equal(result.id, doc1.id);
                    assert.equal(result.links[0].id, doc1.links[0].id);
                    assert.equal(result.links[1].id, doc1.links[1].id);
                    assert.equal(result.links[2].id, doc1.links[2].id);
                    Model.get(doc2.id).getJoin({links: { order: "id"}}).run().then(function(result) {
                        assert.equal(result.id, doc2.id);
                        assert.equal(result.links[0].id, doc2.links[0].id);
                        assert.equal(result.links[1].id, doc2.links[1].id);
                        assert.equal(result.links[2].id, doc2.links[2].id);
                        done()
                    })
                });
            });
        }).error(done);
    });
    it('hasAndBelongsToMany -- primary keys -- circular references', function(done) {
        var name = util.s8();
        var Model = thinky.createModel(name, {
            id: String
        });

        var otherName = util.s8();
        var OtherModel = thinky.createModel(otherName, {
            id: String
        });

        Model.hasAndBelongsToMany(OtherModel, "links", "id", "id");
        
        // Dirty patch for https://github.com/rethinkdb/rethinkdb/issues/2226
        setTimeout(function() {

        OtherModel.hasAndBelongsToMany(Model, "links2", "id", "id");

        var values = {};
        var otherValues = {};
        var doc1 = new Model({});
        var doc2 = new Model({});
        var otherDoc1 = new OtherModel({});
        var otherDoc2 = new OtherModel({});
        var otherDoc3 = new OtherModel({});
        var otherDoc4 = new OtherModel({});

        doc1.links = [otherDoc1, otherDoc2, otherDoc4]
        doc2.links = [otherDoc2, otherDoc3, otherDoc4]
        otherDoc1.links2 = [doc1];
        otherDoc2.links2 = [doc1, doc2];
        otherDoc3.links2 = [doc2];
        otherDoc4.links2 = [doc1, doc2];

        doc1.saveAll().then(function(result) {
            // All docs are saved
            assert.equal(doc1.isSaved(), true);
            assert.equal(doc1.links[0].isSaved(), true);
            assert.equal(doc1.links[1].isSaved(), true);
            assert.equal(doc1.links[2].isSaved(), true);
            assert.strictEqual(doc1, result);
            
            // All saved docs have an id
            assert.equal(typeof doc1.id, 'string');
            assert.equal(typeof doc1.links[0].id, 'string');
            assert.equal(typeof doc1.links[1].id, 'string');
            assert.equal(typeof doc1.links[2].id, 'string');
            util.sortById(doc1.links);

            doc2.saveAll().then(function(result) {
                // All docs are saved
                assert.equal(doc2.isSaved(), true);
                assert.equal(doc2.links[0].isSaved(), true);
                assert.equal(doc2.links[1].isSaved(), true);
                assert.equal(doc2.links[2].isSaved(), true);
                assert.strictEqual(doc2, result);

                // All saved docs have an id
                assert.equal(typeof doc2.id, 'string');
                assert.equal(typeof doc2.links[0].id, 'string');
                assert.equal(typeof doc2.links[1].id, 'string');
                assert.equal(typeof doc2.links[2].id, 'string');
                util.sortById(doc2.links);

                util.sortById(doc2.links);

                // doc1 and doc2 share two common links
                var map = {}
                for(var i=0; i<doc1.links.length; i++) {
                    map[doc1.links[i].id] = true
                }
                var count = 0;
                for(var i=0; i<doc2.links.length; i++) {
                    if (map[doc2.links[i].id] != true) {
                        count++;
                    }
                }
                assert(count,2);

                util.sortById(otherDoc1.links2);
                util.sortById(otherDoc2.links2);
                util.sortById(otherDoc3.links2);
                util.sortById(otherDoc4.links2);

                Model.get(doc1.id).getJoin({links: { order: "id"}}).run().then(function(result) {
                    assert.equal(result.id, doc1.id);
                    assert.equal(result.links[0].id, doc1.links[0].id);
                    assert.equal(result.links[1].id, doc1.links[1].id);
                    assert.equal(result.links[2].id, doc1.links[2].id);
                    Model.get(doc2.id).getJoin({links: { order: "id"}}).run().then(function(result) {
                        assert.equal(result.id, doc2.id);
                        assert.equal(result.links[0].id, doc2.links[0].id);
                        assert.equal(result.links[1].id, doc2.links[1].id);
                        assert.equal(result.links[2].id, doc2.links[2].id);
                        OtherModel.get(otherDoc1.id).getJoin().run().then(function(result) {
                            assert.equal(result.id, otherDoc1.id);
                            assert.equal(result.links2[0].id, otherDoc1.links2[0].id)
                            OtherModel.get(otherDoc2.id).getJoin({links2: { order: "id"}}).run().then(function(result) {
                                assert.equal(result.id, otherDoc2.id);
                                assert.equal(result.links2[0].id, otherDoc2.links2[0].id)
                                assert.equal(result.links2[1].id, otherDoc2.links2[1].id)
                                OtherModel.get(otherDoc3.id).getJoin({links2: { order: "id"}}).run().then(function(result) {
                                    assert.equal(result.id, otherDoc3.id);
                                    assert.equal(result.links2[0].id, otherDoc3.links2[0].id)
                                    OtherModel.get(otherDoc4.id).getJoin({links2: { order: "id"}}).run().then(function(result) {
                                        assert.equal(result.id, otherDoc4.id);
                                        assert.equal(result.links2[0].id, otherDoc4.links2[0].id)
                                        assert.equal(result.links2[1].id, otherDoc4.links2[1].id)

                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }).error(done);

        }, 1000)
    });
});
