var SchemaObj = {};
 
 SchemaObj.createSchema = function(mongoose) {
	 
	 // 글 스키마 정의
	 var PostSchema = mongoose.Schema({
		 title: {type: String, trim: true, 'default':''},		// 글 제목
		 contents: {type: String, trim:true, 'default':''},						// 글 내용
		 writer: {type: String, 'default': ''},							// 글쓴 사람
		 comments: [{		// 댓글
			 contents: {type: String, trim:true, 'default': ''},					// 댓글 내용
			 writer: {type: String, 'default': ''},
			 created_at: {type: Date, 'default': Date.now}
		 }],
		 tags: {type: [], 'default': ''},
		 created_at: {type: Date, index: {unique: false}, 'default': Date.now},
		 updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	 });
	 
	 // 필수 속성에 대한 'required' validation
	 PostSchema.path('title').required(true, '글 제목을 입력하셔야 합니다.');
	 PostSchema.path('contents').required(true, '글 내용을 입력하셔야 합니다.');
	 
	 // 스키마에 인스턴스 메소드 추가
	 PostSchema.methods = {
		 savePost: function(callback) {		// 글 저장
			 var self = this;
			 
			 this.validate(function(err) {
				 if (err) return callback(err);
				 
				 self.save(callback);
			 });
		 },
		 addComment: function(user, comment, callback) {		// 댓글 추가
			 this.comment.push({
				 contents: comment.contents,
				 writer: user._id
			 });
			 
			 this.save(callback);
		 },
		 removeComment: function(id, callback) {		// 댓글 삭제
			 var index = utils.indexOf(this.comments, {id: id});
			 if (~index) {
				 this.comments.splice(index, 1);
			 } else {
				 return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			 }
			 
			 this.save(callback);
		 }
	 }
	 
	 PostSchema.statics = {
		 // ID로 글 찾기
		 load: function(id, callback) {
			 this.findOne({_id: id})
				 .populate('writer', 'name provider email')
				 .populate('comments.writer')
				 .exec(callback);
		 },
		 list: function(options, callback) {
			 var criteria = options.criteria || {};
			 
			 this.find(criteria)
				 .populate('writer', 'name provider email')
				 .sort({'created_at': -1})
				 .limit(Number(options.perPage))
				 .skip(options.perPage * options.page)
				 .exec(callback);
		 }
	 }
	  
	 return PostSchema;
 };
 
 // module.exports에 PostSchema 객체 직접 할당
 module.exports = SchemaObj;

 
 /**
 * 배열 객체 안의 배열 요소가 가지는 인덱스 값 리턴
 */
function indexOf(arr, obj) {
	var index = -1;
	var keys = Object.keys(obj);

	var result = arr.filter(function (doc, idx) {
		var matched = 0;

		for (var i = keys.length - 1; i >= 0; i--) {
			if (doc[keys[i]] === obj[keys[i]]) {
				matched++;

				if (matched === keys.length) {
					index = idx;
					return idx;
				}
			}
		}
	});

	return index;
}

/**
 * 배열 안의 요소 중에서 파라미터와 같은 객체를 리턴
 */
function findByParam(arr, obj, callback) {
	var index = exports.indexof(arr, obj)
	if (~index && typeof callback === 'function') {
		return callback(undefined, arr[index])
	} else if (~index && !callback) {
		return arr[index]
	} else if (!~index && typeof callback === 'function') {
		return callback('not found')
	}
}