QUnit.test( "Qunit init", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});

// test if main object exist
QUnit.test("Dataentry Exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt, "Passed!" );
});

// test attributes 

QUnit.test( "Dataentry min_time exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.min_time, "Passed!" );
});


QUnit.test( "Dataentry process_ids exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.process_ids, "Passed!" );
});

QUnit.test( "Dataentry time exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.time === 0, "Passed!" );
});

QUnit.test( "Dataentry min_code exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.min_code, "Passed!" );
});

QUnit.test( "Dataentry max_code exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.max_code, "Passed!" );
});

QUnit.test( "Dataentry type exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.type, "Passed!" );
});

QUnit.test( "Dataentry typeCharCode exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.typeCharCode, "Passed!" );
});

QUnit.test( "Dataentry attachType exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.attachType, "Passed!" );
});

QUnit.test( "Dataentry stop exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.stop, "Passed!" );
});

QUnit.test( "Dataentry attachDelete exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.attachDelete, "Passed!" );
});

QUnit.test( "Dataentry attachClone exist", function( assert ) {
    var dt = DataEntry.makeDataEntry();
    assert.ok( dt.attachClone, "Passed!" );
});
