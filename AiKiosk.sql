-- --------------------------------------------------------
-- 호스트:                          aikiosk.cfyh04m5ffnz.us-east-2.rds.amazonaws.com
-- 서버 버전:                        8.0.32 - Source distribution
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Ai_Kiosk 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `Ai_Kiosk` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Ai_Kiosk`;

-- 테이블 Ai_Kiosk.Manual 구조 내보내기
CREATE TABLE IF NOT EXISTS `Manual` (
  `id` int NOT NULL AUTO_INCREMENT,
  `greeting` varchar(100) NOT NULL,
  `ordering` varchar(100) NOT NULL,
  `complain` varchar(100) NOT NULL,
  `requestfromcustomer` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 Ai_Kiosk.Manual:~0 rows (대략적) 내보내기
INSERT INTO `Manual` (`id`, `greeting`, `ordering`, `complain`, `requestfromcustomer`) VALUES
	(1, '어서오세요', '메뉴, 포인트적립, 포장여부, 결제형태 순서로 질문 후 대기번호 안내', '상황 파악 후 매니저에게 보고', '가능한 요청인지 파악 후 다른 직원에게도 전달'),
	(2, '어서오세요', '메뉴, 샷 혹은 시럽 추가 여부, 매장식사 혹은 테이크아웃, 주차여부 순서로 질문 후 대기번호 안내', '상황 파악 후 매니저에게 보고', '가능한 요청인지 파악 후 다른 직원에게도 전달'),
	(3, '어서오세요', '메뉴, 매장식사 여부 질문 후 대기번호 안내', '상황 파악 후 매니저에게 보고', '가능한 요청인지 파악 후 다른 직원에게도 전달');

-- 테이블 Ai_Kiosk.Menu 구조 내보내기
CREATE TABLE IF NOT EXISTS `Menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(100) NOT NULL,
  `ingredient` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `storename` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 Ai_Kiosk.Menu:~0 rows (대략적) 내보내기
INSERT INTO `Menu` (`id`, `name`, `type`, `ingredient`, `description`, `price`, `storename`) VALUES
	(1, '불고기버거', '햄버거', '번스, 마요네즈, 불고기소스, 레터스, 양파, 불고기패티', '소고기패티와 불고기소스가 잘 어울리는 대표버거', '4700원', '롯데리아'),
	(2, '새우버거', '햄버거', '번스, 사우전아일랜드소스, 타타르소스, 레터스, 새우패티', '새우살이 가득 들어간 새우버거', '4700원', '롯데리아'),
	(3, '핫크리스피버거', '햄버거', '번스, 마요네즈, 레터스, 토마토, 핫크리스피패티', '닭가슴살 패티로 만든 매콤한 치킨버거', '5900원', '롯데리아'),
	(4, '포테이토', '디저트', '감자', '바삭한 후렌치 포테이토', '1800원', '롯데리아'),
	(5, '치즈스틱', '디저트', '모짜렐라치즈, 튀김옷', '통모짜렐라치즈에 튀김옷을 입혀 만든 대표 디저트 메뉴', '2400원', '롯데리아'),
	(6, '콜라', '드링크', '콜라', '톡 쏘는 시원한 콜라', '2000원', '롯데리아'),
	(7, '카페아메리카노', '커피', '커피원두, 물', '깔끔하고 부드러운 커피', '4500원', '스타벅스'),
	(8, '카페라떼', '커피', '커피원두, 우유', '에스프레소와 우유가 만나 부드러운 커피', '5000원', '스타벅스'),
	(9, '자몽허니블랙티', '티바나', '자몽, 꿀, 물', '새콤한 자몽과 달콤한 꿀이 조화를 이루는 티', '5700원', '스타벅스'),
	(10, '치킨마요', '마요시리즈', '치킨, 마요네즈, 덮밥소스, 계란지단, 밥, 김', '지단과 슬라이스한 치킨이 올라간 대표메뉴', '3700원', '한솥'),
	(11, '참치마요', '마요시리즈', '참치, 마요네즈, 덮밥소스, 계란지단, 밥, 김', '담백한 참치가 올라간 메뉴', '3500원', '한솥'),
	(12, '돈까스덮밥', '덮밥시리즈', '돈까스, 덮밥소스, 양파, 밥', '국내산 등심돈까스를 올린 메뉴', '4100원', '한솥'),
	(13, '제육볶음도시락', '모둠시리즈', '밥, 제육볶음, 각종 계절반찬', '가장 맛있는 부위로 만든 제육볶음을 듬뿍 담은 도시락', '4500원', '한솥');

-- 테이블 Ai_Kiosk.Store 구조 내보내기
CREATE TABLE IF NOT EXISTS `Store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `operatingtime` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `callnumber` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 Ai_Kiosk.Store:~2 rows (대략적) 내보내기
INSERT INTO `Store` (`id`, `name`, `category`, `operatingtime`, `address`, `callnumber`) VALUES
	(1, '롯데리아', '패스트푸드', '오전9시 ~ 오후8시', '경상북도 구미시 대학로 61', '0544787114'),
	(2, '스타벅스', '카페', '오전9시 ~ 오후10시', '경상북도 구미시 대학로 61', '0544787114'),
	(3, '한솥도시락', '일반음식점', '오전10시 ~ 오후7시', '경상북도 구미시 대학로61', '0544787114');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

/*쿼리문*/
/*가게별 메뉴 조회*/
/*SELECT Store.name, Menu.name FROM Store, Menu WHERE Store.name = " " AND Menu.storename = Store.name;*/

/*메뉴 별 조회*/
/*SELECT * FROM Menu WHERE Menu.name = " ";*/

/*메뉴 추가*/
/*INSERT INTO Menu(name, type, ingredient, description, price, storename) VALUES ();*/