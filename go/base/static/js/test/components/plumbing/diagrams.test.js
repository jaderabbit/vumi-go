describe("go.components.plumbing.diagrams", function() {
  var stateMachine = go.components.stateMachine;

  var plumbing = go.components.plumbing;

  var testHelpers = plumbing.testHelpers,
      setUp = testHelpers.setUp,
      newComplexDiagram = testHelpers.newComplexDiagram,
      tearDown = testHelpers.tearDown;

  var diagram;

  beforeEach(function() {
    setUp();
    diagram = newComplexDiagram();
  });

  afterEach(function() {
    tearDown();
  });

  describe(".Diagram", function() {
    var AppleStateView = testHelpers.AppleStateView,
        BananaStateView = testHelpers.BananaStateView;

    var LeftToRightView = testHelpers.LeftToRightView,
        RightToLeftView = testHelpers.RightToLeftView;

    it("should keep track of all endpoints in the diagram", function() {
      assert.deepEqual(
        diagram.endpoints.keys(),
        ['a1L1', 'a1L2', 'a1R1', 'a1R2',
         'a2L1', 'a2L2', 'a2R1', 'a2R2',
         'b1L1', 'b1L2', 'b1R1', 'b1R2',
         'b2L1', 'b2L2', 'b2R1', 'b2R2']);
    });

    it("should set up the connections according to the schema", function() {
      var leftToRight = diagram.connections.members.get('leftToRight'),
          rightToLeft = diagram.connections.members.get('rightToLeft');

      assert.deepEqual(leftToRight.keys(), ['a1L2-b2R2']);
      assert.deepEqual(rightToLeft.keys(), ['b1R2-a2L2']);

      leftToRight.each(
        function(e) { assert.instanceOf(e, LeftToRightView); });

      rightToLeft.each(
        function(e) { assert.instanceOf(e, RightToLeftView); });

      assert.deepEqual(
        diagram.connections.keys(),
        ['a1L2-b2R2', 'b1R2-a2L2']);
    });

    it("should set up the states according to the schema", function() {
      var apples = diagram.states.members.get('apples'),
          bananas = diagram.states.members.get('bananas');

      assert.deepEqual(apples.keys(), ['a1', 'a2']);
      assert.deepEqual(bananas.keys(), ['b1', 'b2']);

      apples.each(function(e) { assert.instanceOf(e, AppleStateView); });
      bananas.each(function(e) { assert.instanceOf(e, BananaStateView); });

      assert.deepEqual(diagram.states.keys(), ['a1', 'a2', 'b1', 'b2']);
    });

    describe(".render", function() {
      it("should render its states", function() {
        diagram.states.each(function(s) { assert(!s.rendered); });
        diagram.render();
        diagram.states.each(function(s) { assert(s.rendered); });
      });

      it("should render its connections", function() {
        diagram.connections.each(function(s) { assert(!s.rendered); });
        diagram.render();
        diagram.connections.each(function(s) { assert(s.rendered); });
      });
    });
  });
});
