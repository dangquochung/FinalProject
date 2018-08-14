/*
Navicat MySQL Data Transfer

Source Server         : My Local
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : book_store

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-08-08 09:00:06
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `tblaccount`
-- ----------------------------
DROP TABLE IF EXISTS `tblaccount`;
CREATE TABLE `tblaccount` (
  `icon` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `account` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblaccount
-- ----------------------------
INSERT INTO `tblaccount` VALUES (null, 'e10adc3949ba59abbe56e057f20f883e', 'steven_huang', 'hopeless.sweet.boy@gmail.com', '14');
INSERT INTO `tblaccount` VALUES (null, 'c33367701511b4f6020ec61ded352059', 'hung_dq', 'dqh@gmail.com', '15');
INSERT INTO `tblaccount` VALUES (null, 'e10adc3949ba59abbe56e057f20f883e', 'namnp', 'namnp@gmail.com', '16');
INSERT INTO `tblaccount` VALUES (null, 'e10adc3949ba59abbe56e057f20f883e', 'hoangnh', 'hoangnh@gmail.com', '17');
INSERT INTO `tblaccount` VALUES (null, 'e10adc3949ba59abbe56e057f20f883e', 'dungnd', 'dungnd@gmail.com', '18');
INSERT INTO `tblaccount` VALUES (null, '4297f44b13955235245b2497399d7a93', 'ducdung', 'asdasafas@asafaf.com', '19');
INSERT INTO `tblaccount` VALUES (null, '44038d96a56addff306a9cce1a643d9b', 'hackezvn', 'test@gmail.com', '20');
INSERT INTO `tblaccount` VALUES (null, 'e10adc3949ba59abbe56e057f20f883e', 'hung_dq6', 'aa@gmail.com', '21');

-- ----------------------------
-- Table structure for `tbladdress`
-- ----------------------------
DROP TABLE IF EXISTS `tbladdress`;
CREATE TABLE `tbladdress` (
  `description` varchar(255) DEFAULT NULL,
  `home_index` int(11) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbladdress
-- ----------------------------
INSERT INTO `tbladdress` VALUES ('Không rõ mô tả', '29', 'Vạn Phúc', 'Hà Đông', 'Hà Nội', '1');
INSERT INTO `tbladdress` VALUES ('Không biết', '16', 'Chăm Mát', 'Hòa Bình', 'Hòa Bình', '2');
INSERT INTO `tbladdress` VALUES ('Gần chỗ cụ rùa', '17', 'Bà Triệu', 'Hai Bà Trưng', 'Hà Nội', '3');
INSERT INTO `tbladdress` VALUES (null, '18', 'Dân Chủ', 'Hòa Bình', 'Hòa Bình', '17');
INSERT INTO `tbladdress` VALUES (null, '12', 'Lê Văn Lươngsdsd', 'Hà Nội', 'Hà Nội', '18');
INSERT INTO `tbladdress` VALUES (null, '12', 'Thái Bình', 'Thái Bình', 'Thái Bình', '19');
INSERT INTO `tbladdress` VALUES ('', '12', 'Hà Nội', 'Hà Nội', 'Hà Nội', '20');
INSERT INTO `tbladdress` VALUES (null, '11', 'Lê Văn Lương', 'Hà Nội', 'Hà Nội', '21');
INSERT INTO `tbladdress` VALUES (null, '12', 'afsafsaf', 'asfafsf', 'Ha Noi', '22');
INSERT INTO `tbladdress` VALUES (null, '1', 'Nam Tu Liem', 'Hanoi', 'Hanoi', '23');

-- ----------------------------
-- Table structure for `tblauthor`
-- ----------------------------
DROP TABLE IF EXISTS `tblauthor`;
CREATE TABLE `tblauthor` (
  `major` varchar(255) NOT NULL,
  `person_id` int(11) NOT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblauthor
-- ----------------------------
INSERT INTO `tblauthor` VALUES ('Cô giáo thảo', '1');
INSERT INTO `tblauthor` VALUES ('Em gái mưa', '2');
INSERT INTO `tblauthor` VALUES ('Nhà văn', '3');

-- ----------------------------
-- Table structure for `tblbank`
-- ----------------------------
DROP TABLE IF EXISTS `tblbank`;
CREATE TABLE `tblbank` (
  `icon` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblbank
-- ----------------------------
INSERT INTO `tblbank` VALUES ('W3Schools.png', 'Ngân hàng W3School', 'https://www.w3schools.com/', '1');

-- ----------------------------
-- Table structure for `tblbook`
-- ----------------------------
DROP TABLE IF EXISTS `tblbook`;
CREATE TABLE `tblbook` (
  `publish_date` date DEFAULT NULL,
  `description` longtext,
  `price` int(11) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblbook
-- ----------------------------
INSERT INTO `tblbook` VALUES (null, 'Đặng Quốc Hùng và đồng bọn đột nhập vào ngân hàng bị đánh vỡ đầu.', '150000', 'Book.png', '2', '1', 'Đặng Quốc Hùng và đồng bọn', '00000000001');
INSERT INTO `tblbook` VALUES (null, 'Nguyễn Phương Nam và đồng bọn đột nhập trụ sở bộ Giáo Dục, cướp đi đề thi THPT QG năm 2018.', '135000', 'Book.png', '1', '2', 'Nguyễn Phương Nam và đồng bọn', '00000000002');
INSERT INTO `tblbook` VALUES (null, 'Nguyễn Trung Đức vào một ngày mát trời rủ em gái hàng xóm vào bụi chuối sau nhà và...', '386000', 'Book.png', '1', '1', 'Nguyễn Trung Đức và em gái hàng xóm', '00000000003');
INSERT INTO `tblbook` VALUES (null, 'Nguyễn Đức Dũng trong thời gian làm cận vệ của Kim Jong Un tại Triều Tiên đã học lỏm được bí kíp chế tạo tên lửa hạng nặng khiến Mỹ phải nể phục.', '600000', 'Book.png', '2', '2', 'Nguyễn Đức Dũng và hệ thống tên lửa Kim Jong Un', '00000000004');
INSERT INTO `tblbook` VALUES (null, 'Nguyễn Huy Hoàng đại diện cho biệt đội ngoài hành tinh mới đây đã khoe chiến tích chế tạo tên lửa ngoài hành tinh có sức công phá gấp tỷ lần tên lửa của Kim Jong Un.', '256000', 'Book.png', '2', '1', 'Nguyễn Huy Hoàng và tên lửa ngoài hành tinh', '00000000005');
INSERT INTO `tblbook` VALUES (null, 'Tác phẩm nổi tiếng của tác giả Nguyễn Nhật Ánh, được đông đảo bạn đọc đón đọc, gần hơn đã được chuyển thể thành <b>bộ phim cùng tên</b> với doanh thu nghìn tỷ đồng.', '385000', 'Book.png', '3', '2', 'Tôi thấy hoa vàng trên cỏ xanh', '00000000006');

-- ----------------------------
-- Table structure for `tblcomic`
-- ----------------------------
DROP TABLE IF EXISTS `tblcomic`;
CREATE TABLE `tblcomic` (
  `type` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblcomic
-- ----------------------------
INSERT INTO `tblcomic` VALUES ('Truyện người lớn', '18', '3');

-- ----------------------------
-- Table structure for `tblcomment`
-- ----------------------------
DROP TABLE IF EXISTS `tblcomment`;
CREATE TABLE `tblcomment` (
  `date` datetime DEFAULT NULL,
  `comment` longtext,
  `book_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblcomment
-- ----------------------------
INSERT INTO `tblcomment` VALUES ('2018-08-07 00:00:00', 'Quá ngon', '1', '1', '10');
INSERT INTO `tblcomment` VALUES ('2018-08-08 00:00:00', 'Chứ sao', '1', '2', '9');
INSERT INTO `tblcomment` VALUES ('2018-08-07 16:44:54', 'Chuẩn vãi luôn', '1', '5', '9');
INSERT INTO `tblcomment` VALUES ('2018-08-07 16:46:59', 'Hay!!!!', '2', '6', '9');
INSERT INTO `tblcomment` VALUES ('2018-08-07 17:23:24', 'ĐM thằng Sin', '1', '7', '9');
INSERT INTO `tblcomment` VALUES ('2018-08-07 17:24:23', 'vai lon\n', '1', '8', '9');

-- ----------------------------
-- Table structure for `tblcustomer`
-- ----------------------------
DROP TABLE IF EXISTS `tblcustomer`;
CREATE TABLE `tblcustomer` (
  `account_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblcustomer
-- ----------------------------
INSERT INTO `tblcustomer` VALUES ('14', '9');
INSERT INTO `tblcustomer` VALUES ('15', '10');
INSERT INTO `tblcustomer` VALUES ('16', '11');
INSERT INTO `tblcustomer` VALUES ('17', '12');
INSERT INTO `tblcustomer` VALUES ('18', '13');
INSERT INTO `tblcustomer` VALUES ('19', '14');
INSERT INTO `tblcustomer` VALUES ('20', '15');
INSERT INTO `tblcustomer` VALUES ('21', '16');

-- ----------------------------
-- Table structure for `tblcustomeraccount`
-- ----------------------------
DROP TABLE IF EXISTS `tblcustomeraccount`;
CREATE TABLE `tblcustomeraccount` (
  `point` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblcustomeraccount
-- ----------------------------
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '14');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '15');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '16');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '17');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '18');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '19');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '20');
INSERT INTO `tblcustomeraccount` VALUES ('0', '0', '21');

-- ----------------------------
-- Table structure for `tblimportbook`
-- ----------------------------
DROP TABLE IF EXISTS `tblimportbook`;
CREATE TABLE `tblimportbook` (
  `price` int(11) NOT NULL,
  `date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblimportbook
-- ----------------------------
INSERT INTO `tblimportbook` VALUES ('120000', '2018-08-06', '8', '1');
INSERT INTO `tblimportbook` VALUES ('95000', '2018-08-06', '7', '2');

-- ----------------------------
-- Table structure for `tblnovel`
-- ----------------------------
DROP TABLE IF EXISTS `tblnovel`;
CREATE TABLE `tblnovel` (
  `type` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblnovel
-- ----------------------------
INSERT INTO `tblnovel` VALUES ('Tiểu thuyết thiếu nhi', '12', '6');

-- ----------------------------
-- Table structure for `tblorder`
-- ----------------------------
DROP TABLE IF EXISTS `tblorder`;
CREATE TABLE `tblorder` (
  `status` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblorder
-- ----------------------------
INSERT INTO `tblorder` VALUES ('3', '2018-08-06', '5');
INSERT INTO `tblorder` VALUES ('3', '2018-08-06', '6');
INSERT INTO `tblorder` VALUES ('3', '2018-08-06', '7');

-- ----------------------------
-- Table structure for `tblorderitem`
-- ----------------------------
DROP TABLE IF EXISTS `tblorderitem`;
CREATE TABLE `tblorderitem` (
  `quantity` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`,`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblorderitem
-- ----------------------------
INSERT INTO `tblorderitem` VALUES ('2', '1', '5');
INSERT INTO `tblorderitem` VALUES ('3', '1', '6');
INSERT INTO `tblorderitem` VALUES ('3', '1', '7');
INSERT INTO `tblorderitem` VALUES ('2', '2', '5');
INSERT INTO `tblorderitem` VALUES ('2', '2', '6');
INSERT INTO `tblorderitem` VALUES ('1', '3', '5');
INSERT INTO `tblorderitem` VALUES ('1', '5', '5');

-- ----------------------------
-- Table structure for `tblpaymentmethod`
-- ----------------------------
DROP TABLE IF EXISTS `tblpaymentmethod`;
CREATE TABLE `tblpaymentmethod` (
  `status` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblpaymentmethod
-- ----------------------------
INSERT INTO `tblpaymentmethod` VALUES ('0', '5');
INSERT INTO `tblpaymentmethod` VALUES ('0', '6');
INSERT INTO `tblpaymentmethod` VALUES ('0', '7');

-- ----------------------------
-- Table structure for `tblperson`
-- ----------------------------
DROP TABLE IF EXISTS `tblperson`;
CREATE TABLE `tblperson` (
  `phone` varchar(12) DEFAULT NULL,
  `avarta` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `description` longtext,
  `dob` date DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblperson
-- ----------------------------
INSERT INTO `tblperson` VALUES (null, 'Female_Empty_Avarta.jpg', '1', 'Blabla', '2018-07-18', '1', 'Đặng Quốc Hùng', '1');
INSERT INTO `tblperson` VALUES (null, 'Unknow_Empty_Avarta.png', '2', 'Unknơ', '2018-07-18', '2', 'Nguyễn Phương Nam', '2');
INSERT INTO `tblperson` VALUES (null, 'Male_Empty_Avarta.png', '0', 'Tác giả nổi tiếng', '2018-07-06', '3', 'Nguyễn Nhật Ánh', '3');
INSERT INTO `tblperson` VALUES ('0976075396', 'steven_huang.jpg', '0', 'ádhjkl;\'', '1996-03-15', '17', 'Steven Huang', '9');
INSERT INTO `tblperson` VALUES (null, 'hung_dq.jpg', '0', '', '1996-02-16', '18', 'Đặng Quốc Hùng', '10');
INSERT INTO `tblperson` VALUES (null, 'namnp.jpg', '0', '', '1996-09-30', '19', 'Nguyễn Phương Nam', '11');
INSERT INTO `tblperson` VALUES (null, 'Unknow_Empty_Avarta.png', '2', '', '2018-07-24', '20', 'Nguyễn Huy Hoàng', '12');
INSERT INTO `tblperson` VALUES (null, 'Unknow_Empty_Avarta.png', '2', 'Nguyễn Đức Dũng và hệ thống tên lửa Kim Jong Un', '2018-07-26', '21', 'Nguyễn Đức Dũng', '13');
INSERT INTO `tblperson` VALUES (null, 'Male_Empty_Avarta.png', '0', '', '2000-03-03', '22', 'ndd', '14');
INSERT INTO `tblperson` VALUES (null, 'Male_Empty_Avarta.png', '0', '', '1996-11-20', '23', 'hoàng vũ', '15');

-- ----------------------------
-- Table structure for `tblpublisher`
-- ----------------------------
DROP TABLE IF EXISTS `tblpublisher`;
CREATE TABLE `tblpublisher` (
  `publish_date` date DEFAULT NULL,
  `address_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblpublisher
-- ----------------------------
INSERT INTO `tblpublisher` VALUES ('2018-07-16', '1', 'Number 1', '1');
INSERT INTO `tblpublisher` VALUES ('2018-07-16', '2', 'Number 2', '2');

-- ----------------------------
-- Table structure for `tblrate`
-- ----------------------------
DROP TABLE IF EXISTS `tblrate`;
CREATE TABLE `tblrate` (
  `rate` int(11) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`,`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblrate
-- ----------------------------
INSERT INTO `tblrate` VALUES ('4', '1', '9');
INSERT INTO `tblrate` VALUES ('2', '1', '10');

-- ----------------------------
-- Table structure for `tblreferencebook`
-- ----------------------------
DROP TABLE IF EXISTS `tblreferencebook`;
CREATE TABLE `tblreferencebook` (
  `type` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblreferencebook
-- ----------------------------
INSERT INTO `tblreferencebook` VALUES ('Kim Jong Un', 'Tên lửa', '4');

-- ----------------------------
-- Table structure for `tblschoolbook`
-- ----------------------------
DROP TABLE IF EXISTS `tblschoolbook`;
CREATE TABLE `tblschoolbook` (
  `type` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblschoolbook
-- ----------------------------
INSERT INTO `tblschoolbook` VALUES (null, 'Văn', '12', '1');
INSERT INTO `tblschoolbook` VALUES ('Sách giáo viên', 'Giáo dục công dân', '10', '2');

-- ----------------------------
-- Table structure for `tblsciencebook`
-- ----------------------------
DROP TABLE IF EXISTS `tblsciencebook`;
CREATE TABLE `tblsciencebook` (
  `type` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblsciencebook
-- ----------------------------
INSERT INTO `tblsciencebook` VALUES ('Khoa học vũ trụ', 'Báu vật ngoài hành tinh', '5');

-- ----------------------------
-- Table structure for `tblshipping`
-- ----------------------------
DROP TABLE IF EXISTS `tblshipping`;
CREATE TABLE `tblshipping` (
  `receiver_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tblshipping
-- ----------------------------
