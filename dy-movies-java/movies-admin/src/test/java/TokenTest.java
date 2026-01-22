import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.test.context.ContextConfiguration;
import xyz.jdynb.dymovies.admin.mapper.AdminUserMapper;
import xyz.jdynb.dymovies.admin.service.AdminUserService;
import xyz.jdynb.dymovies.admin.service.impl.AdminUserServiceImpl;
import xyz.jdynb.dymovies.common.utils.JwtUtils;

public class TokenTest {


    @Test
    public void test() {
        JwtUtils jwtUtils = new JwtUtils();
        System.out.println(jwtUtils.generateToken(1));
    }

}
