'use strict';

describe('k12App.version module', function() {
  beforeEach(module('k12App.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
