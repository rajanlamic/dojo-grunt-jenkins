define(['./module1'], function(module1) {
	return {
		get: module1.get + ' -> module2'
	}
});